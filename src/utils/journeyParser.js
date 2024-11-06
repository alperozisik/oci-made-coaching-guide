import React from 'react';
import guide from '../guide.json';
import Link from '../components/Link';
/**
 * Parses the journey YAML and merges the default and exception flows based on step names.
 * Steps with the same name are merged, with properties from the exception flow taking priority.
 * The `insertAfter` property determines the placement of new steps in the flow.
 * 
 * @param {Array} defaultFlow - The default journey flow steps.
 * @param {Array} exceptionFlow - The exception flow steps to merge.
 * @returns {Array} - The merged journey flow.
 */
const injectExceptionsIntoFlow = (defaultFlow, exceptionFlow) => {
    // Merge steps with the same name, giving priority to exceptionFlow properties
    const mergedFlow = defaultFlow.map(step => {
        const matchingExceptionStep = exceptionFlow.find(excStep => excStep.step === step.step);
        if (matchingExceptionStep) {
            // Merge with exception, only replace with non-empty properties from exception
            return {
                ...step,
                ...Object.keys(matchingExceptionStep).reduce((merged, key) => {
                    merged[key] = matchingExceptionStep[key] !== "" ? matchingExceptionStep[key] : step[key];
                    return merged;
                }, {})
            };
        }
        return step;
    });

    // Find additional steps in exceptionFlow that are not in defaultFlow
    const additionalSteps = exceptionFlow.filter(excStep =>
        !defaultFlow.some(defStep => defStep.step === excStep.step)
    );

    // Handle the placement of additional steps using `insertAfter`
    additionalSteps.forEach(addStep => {
        if (addStep.insertAfter) {
            const index = mergedFlow.findIndex(step => step.step === addStep.insertAfter);
            if (index !== -1) {
                mergedFlow.splice(index + 1, 0, addStep);
            } else {
                // If the specified insertAfter step is not found, add to the end
                mergedFlow.push(addStep);
            }
        } else {
            // If no insertAfter is provided, add to the end
            mergedFlow.push(addStep);
        }
    });

    return mergedFlow;
};

/**
 * Checks if the exception condition is valid or if it's undefined.
 * @param {string|undefined} condition - The condition to be evaluated.
 * @param {Object} userSelection - The current user selection state.
 * @returns {boolean} - True if the condition is valid or not defined.
 */
const isConditionMet = (condition, userSelection) => {
    if (!condition) {
        // If the condition is not defined, return true (always valid)
        return true;
    }
    try {
        // Evaluate the condition with userSelection as the context
        
        var conditionCode = condition.replace(/\${(\w+)}/g, function (_, key) {
            let value = userSelection[key];
            if(value === null)
              return "null";
            else if(typeof value === "undefined")
              return "undefined";
            else if(typeof value === "string" && value.length === 0)
              return '""';
            else
              return "" + value;
          });
        const result =  eval(conditionCode);
        return result;
    } catch (error) {
        console.error("Error evaluating condition:", error);
        return false;
    }
};

/**
 * Parses the journey data from a provided source (e.g., YAML) and generates
 * the flow to be used in the application.
 * 
 * @param {Object} journeyData - The parsed YAML journey data.
 * @param {Object} userSelection - The current user selection state (e.g., persona, topic).
 * @returns {Array} - The final journey flow after merging defaults and exceptions.
 */
export const parseJourney = (journeyData, userSelection) => {
    if (!journeyData || !journeyData.default) {
        console.error("Journey data is not properly loaded or formatted.");
        return [];
    }

    const { default: defaultFlow, exceptions } = journeyData;

    // Check if there is a matching exception for the current user selection
    const matchingException = exceptions.find(exception =>
        isConditionMet(exception.condition, userSelection)
    );

    if (matchingException) {
        // Merge defaultFlow and matching exceptionFlow
        return injectExceptionsIntoFlow(defaultFlow, matchingException.flow);
    }

    // If no exceptions match, return the default flow
    return defaultFlow;
};

/**
 * Parses a given text and replaces placeholders like ${link:ID} with the Link component.
 * @param {string} text - The text to be parsed.
 * @returns {JSX.Element[]} - An array of JSX elements with parsed text.
 */
export const parseText = (text) => {
    return text.split(/(\${link:\d+})/g).map((part, index) => {
        const match = part.match(/\${link:(\d+)}/);
        if (match) {
            const linkId = match[1];
            return <Link key={index} linkId={linkId} />;
        }
        // Replace line breaks with paragraph tags for better formatting
        return <p key={index}>{part}</p>;
    });
};