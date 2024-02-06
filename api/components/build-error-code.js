const xlsx = require("node-xlsx").default;
const yaml = require("js-yaml");
const fs = require("fs");

async function buildErrorCodes() {
    const workSheetsFromBuffer = xlsx.parse(`../../Error-codes.xlsx`);
    let outputObject;

    for (let i = 0; i < workSheetsFromBuffer.length; i++) {
        const sheetName = workSheetsFromBuffer[i]?.name
        if (sheetName === 'Cancellation') {
            outputObject = workSheetsFromBuffer[i]?.data.filter((item, index) => item.length > 0 && index !== 0).map(([Code,
                Reason, triggersRTO, WhoCanUseCode, causeOfCancellation, applicableForPartCancel, comment]) => (
                {
                    Code,
                    Reason,
                    "Triggers RTO?": triggersRTO,
                    "Who can use code?": WhoCanUseCode,
                    "Cause of cancellation & hence cost attributed to": causeOfCancellation,
                    "Applicable for part cancel": applicableForPartCancel,
                    Comment: comment
                }
            ));
        } else if (sheetName === 'Error Codes') {
            outputObject = workSheetsFromBuffer[i]?.data.filter((item, index) => item.length > 0 && index !== 0).map(([Code,
                Type, Message, Description]) => (
                {
                    Code,
                    Type,
                    Message,
                    Description
                }
            ));
        }
        const yamlString = yaml.dump({ [sheetName.replace(' ','')]: outputObject });
        fs.writeFileSync(`./error_codes/${sheetName.replace(' ','')}/${sheetName.replace(' ','')}.yaml`, yamlString,{});
    }
}
buildErrorCodes()
module.exports = { buildErrorCodes }