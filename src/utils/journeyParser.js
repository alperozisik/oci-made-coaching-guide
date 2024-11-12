import React from 'react';
import Link from '../components/Link';
import guideData from '../guide.json';

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
    const additionalSteps = exceptionFlow.filter(excStep => {
        return !defaultFlow.some(defStep => defStep.step === excStep.step)
    });

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
 * @param {Object} journeyState - The current user selection state.
 * @returns {boolean} - True if the condition is valid or not defined.
 */
const isConditionMet = (condition, journeyState) => {
    if (!condition) {
        // If the condition is not defined, return true (always valid)
        return true;
    }
    try {
        // Evaluate the condition with userSelection as the context

        var conditionCode = condition.replace(/\${(\w+)}/g, function (_, key) {
            let value = journeyState[key];
            if (value === null)
                return "null";
            else if (typeof value === "undefined")
                return "undefined";
            else if (typeof value === "string" && value.length === 0)
                return '""';
            else
                return "" + value;
        });
        const result = eval(conditionCode);
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
    console.log("Default flow:", defaultFlow);
    return defaultFlow;
};

/**
 * Parses a given text and replaces placeholders like ${link:ID} and ${variable} with dynamic components or values.
 * If `onlyText` is true, returns plain text without any JSX formatting.
 * @param {string} text - The text to be parsed.
 * @param {Object} journeyState - The state containing the dynamic values to replace in the text.
 * @param {boolean} onlyText - If true, returns the parsed text as a plain string.
 * @returns {JSX.Element[] | string} - An array of JSX elements or plain text depending on `onlyText`.
 */
/**
 * Parses a given text and replaces placeholders like ${link:ID} and ${variable} with dynamic components or values.
 * If `onlyText` is true, returns plain text without any JSX formatting.
 * @param {string} text - The text to be parsed.
 * @param {Object} journeyState - The state containing the dynamic values to replace in the text.
 * @param {boolean} onlyText - If true, returns the parsed text as a plain string.
 * @returns {JSX.Element[] | string} - An array of JSX elements or plain text depending on `onlyText`.
 */
export const parseText = (text, journeyState = {}, onlyText = false) => {
    if (!text) {
        return "";
    }

    const parseLine = (line) => {
        console.log("line:", line);
        let result = line.split(/(\${[^}]+})/g).map((part, index) => {
            console.log("part:", part);
            // Check if the part matches a link placeholder pattern
            const linkMatch = part.match(/\${link:(\d+)}/);
            if (linkMatch) {
                const linkId = linkMatch[1]; // Extracts the link ID
                const linkData = guideData.links?.find(link => link.id === parseInt(linkId));
                if (onlyText) {
                    return linkData ? linkData.url : `#${linkId}`;
                }
                return linkData ? <Link key={`link-${linkId}-${index}`} linkId={linkId} /> : `#${linkId}`;
            }

            // Check if the part matches a variable pattern
            const variableMatch = part.match(/\${(\w+)}/);
            if (variableMatch) {
                const variableKey = variableMatch[1]; // Extracts the variable key
                let value = journeyState[variableKey];

                // Handle different types of values
                if (value === null) {
                    return onlyText ? 'null' : <span key={`variable-${index}`}>null</span>;
                } else if (typeof value === "undefined") {
                    return onlyText ? 'undefined' : <span key={`variable-${index}`}>undefined</span>;
                } else {
                    // Replace variable in text with its value and return
                    const replacedPart = part.replace(/\${\w+}/, value);
                    return onlyText ? replacedPart : <span key={`variable-${index}`}>{replacedPart}</span>;
                }
            }

            // Return the non-matching text part as is
            return onlyText ? part : <span key={`part-${index}`}>{part}</span>;
        });
        return result;
    };

    // If onlyText is true, return the joined string without JSX elements
    let parsedText = "";
    if (onlyText) {
        parsedText = text.split('\n').map(parseLine).flat().join('');
    } else {
        // Return JSX with <p> tags for formatted output
        parsedText = text.split('\n').map((line, lineIndex) => (
            <p key={`line-${lineIndex}`}>
                {parseLine(line)}
            </p>
        ));
    }
    return parsedText;
};