import { Rule } from './types';

export const mockRules: Rule[] = [
  {
      "rule_id": "CP 0142 Child SSN Not Provided",
      "description": "If child SSN is not present send for exception. Exception Message: \"Auto Dependency Processing Reject Reason -Dependent SSN was not provided. Please Review.\"",
      "use_case_ref": "UC-03 -Evaluate Child(ren)",
      "laws_regulations": "V.i.3.E.18.b",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP 0143 Spouse SSN Not Provided",
      "description": "Spouse SSN Verification If spouse SSN is not present then send for exception. Exception Message: \"Auto Dependency Processing Reject Reason -Spouse SSN is not provided. Please review.\"",
      "use_case_ref": "UC-05 -Evaluate Spouse",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0001.1 Eligible End Product Check",
      "description": "Claims will be retrieved based on the end product type; all claims defined in Appendix G: Claim Labels will be eligible for automated processing except those designated as \"not in use\".",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "N/A",
      "action": "evaluate",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0001.2 Eligible End Product Check",
      "description": "The end product must be pending, not canceled or cleared. \"Auto Dependency Processing Reject Reason \u2013End Product Not Pending. Please review.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0001.3 Benefit Claim ID",
      "description": "A benefit claim ID must be associated with the claim that is sent to RBPS for processing and it must be a valid claim. Set to manual processing when the benefit claim ID is not provided or is not a valid RBPS claim. (See Appendix G: Claim Labels). Do not set an Auto Dependency Processing Reject Reason or make changes to the benefit claim label in Corporate.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "offramp",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0001.4",
      "description": "When the veteran has an in-process 290 series or 600 series claim, RBPS shall review the RBPS In-Process Claim Rules (Appendix H). An in-process claim has any claim status except \u201ccancelled\u201d or \u201ccleared\u201d. A rating decision is complete when the benefit claim life cycle status type name is \u201cRating Decision Complete\u201d or the benefit claim life cycle status code is \u201cRDC\u201d. The system shall continue processing the new claim submitted to RBPS: when the 290/600 in-process claim is not listed Appendix H when the 290/600 in-process claim is listed in Appendix H and RBPS Action is \u201cReject if Rating Decision Complete\u201d, and the rating decision of the 600 claim is not complete The system shall send the new claim submitted to RBPS to exception when the pending 290/600 claim is listed as follows in Appendix H: \u201cRBPS Action is \u201cReject\u201d OR b. RBPS Action is \u201cReject if Rating Decision Complete\u201d, and the rating decision of the 600 claim is complete. If sent to exception (4 a. or 4b.), set the Auto Dependency Processing Reject Reason \u2013 \u201cRBPS Failed to find the corporate benefit claim: Pending claim exists for EP [999] series\u201d Where [999] is \u201c600\u201d or \u201c290\u201d depending on claim being processed.",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "N/A",
      "action": "process",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0003 Attachment Check",
      "description": "Submissions containing attachments will be retrieved and processed but will not be sent to Awards Services. Upon running all rules applicable, the claim will be sent for exception processing. \"Auto Dependency Processing Reject Reason \u2013 Claim submitted with attached document(s). Please review document(s).\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "N/A",
      "action": "evaluate",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0004 Previous Rejection",
      "description": "Only new claims shall be processed.",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "N/A",
      "action": "evaluate",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0005 Eligible End Product Action",
      "description": "Only claims with in-scope end products and product claim labels will be eligible for automated processing. EP 130 series (130-139) Compensation Dependency Changes",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "N/A M21-1MR III, iii.5.B.5.d, f; CFR 3.205-3.211",
      "action": "evaluate",
      "category": "claim_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0006 Add Dependent to Corporate Database",
      "description": "Information on claim has been validated. If dependent is not on award then add dependent information to corporate database.",
      "use_case_ref": "UC-02: Evaluate Dependent(s)",
      "laws_regulations": "38 CFR 3.50 to 38 CFR 3.60; M21-1 MR Part III, iii 5.A.1c",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0007 \u2013 a Veteran's address validation",
      "description": "For US address information: IF The address line 1, City, State, and Zip Code field contain information Then Proceed processing the claim",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0007 \u2013 a Veteran\u2019s address validation",
      "description": "For US address information: IF The address line 1, City, State, and Zip Code field contain information Then Proceed processing the claim",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0007 \u2013 b Veteran's address validation",
      "description": "For US address information: IF Any one of these fields; address line 1, City, State, or Zip Code, is empty Then Send the claim for exception processing \"Auto Dependency Processing Reject Reason -Veteran address is incomplete. Please review.",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0007 \u2013 b Veteran\u2019s address validation",
      "description": "For US address information: IF Any one of these fields; address line 1, City, State, or Zip Code, is empty Then Send the claim for exception processing \u201cAuto Dependency Processing Reject Reason -Veteran address is incomplete. Please review.",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0007 \u2013 c Veteran's address validation",
      "description": "For military address: IF The Military Post Office Type is equal to APO, FPO, DPO Then Send the claim for exception processing \"Auto Dependency Processing Reject Reason \u2013 \"Veteran address is foreign, APO, FPO, or DPO type. Please review.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0007 \u2013 c Veteran\u2019s address validation",
      "description": "For military address: IF The Military Post Office Type is equal to APO, FPO, DPO Then Send the claim for exception processing \u201cAuto Dependency Processing Reject Reason \u2013 \u201cVeteran address is foreign, APO, FPO, or DPO type. Please review.\u201d",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "evaluate",
      "category": "veteran_validation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0007 \u2013 d Veteran's address validation",
      "description": "For international address (country not USA): IF claim was entered from SHARE application: IF the following fields are not null: Address Line 1 City Country THEN continue processing the claim ELSE IF one of the above address fields is NULL or blank, THEN Send the claim for exception processing \"Auto Dependency Processing Reject Reason \u2013 Veteran international address is incomplete. Please review.\" IF claim was entered from any other application than SHARE Send the claim for exception processing \"Auto Dependency Processing Reject Reason \u2013 \"Veteran address is foreign, APO, FPO, or DPO type. Please review.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "process",
      "category": "veteran_validation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0007 \u2013 d Veteran\u2019s address validation",
      "description": "For international address (country not USA): IF claim was entered from SHARE application: IF the following fields are not null: Address Line 1 City Country THEN continue processing the claim ELSE IF one of the above address fields is NULL or blank, THEN Send the claim for exception processing \u201cAuto Dependency Processing Reject Reason \u2013 Veteran international address is incomplete. Please review.\u201d IF claim was entered from any other application than SHARE Send the claim for exception processing \u201cAuto Dependency Processing Reject Reason \u2013 \u201cVeteran address is foreign, APO, FPO, or DPO type. Please review.\u201d",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "38 CFR 3.204; M21-1 MR Part III, iii 5.F.33.a",
      "action": "process",
      "category": "veteran_validation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0008 Veteran Living",
      "description": "Determine if Veteran is alive. If Veteran is not living, send for exception processing. \"Auto Dependency Processing Reject Reason \u2013 Veteran is not living.\"",
      "use_case_ref": "UC-01 Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "offramp",
      "category": "veteran_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0010 Data Check",
      "description": "The form (electronic version) used for the claim will be checked to ensure mandatory fields are populated and in the correct format. The mandatory fields for the 686c and the associated validations are: File #, Last name (matching Corporate DB)",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "eligibility",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0011 Veteran Corporate Match",
      "description": "The Veteran's file number matches a record in the corporate database. The records must be an exact match on file number, and last name.",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "eligibility",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0012 Veteran Eligibility for Automated Claim Processing",
      "description": "The following criteria must be met to continue with automated processing: Veteran record exists in the CDB There have been no changes made to rating changes. Award decision has not been changed within last 14 days. Changes made to the Award decision before 14 days but there is no change on future award line or net amount The corresponding Veteran\u2019s COMPENSATION award is active and has not been suspended or terminated. Generate Award Override (GAO) has NOT been used on the corresponding VETSNET current award. If any of the conditions above are not met, record the reason the claim requires exception processing. Exception messages: \u201cAuto Dependency Processing Reject Reason- Changes to the Veterans Last Authorized Award have been made. Please review. \u201c Auto Dependency Processing Reject Reason -Current award is suspended or terminated. Please review.\u201d \u201cAuto Dependency Processing Reject Reason \u2013 Generate Award Override (GAO). Please review.\u201d \u201cAuto Dependency Processing Reject \u2013 Award decision modified in the last 14 days. Claim not eligible for automated processing.\u201d \u201cAuto Dependency Processing Reject \u2013 A change in the net amount or in the future award line was detected. Claim not eligible for automated processing.\u201d When an Award is Terminated with a future date, the claim is set to manual. The following message should be included: \u201cAward is terminated in future. Please review.\u201d Example: Auto Dependency Processing Reject Reason -Award is terminated in future. Please review. System Info: procId = 7781961 errorReference = null timestamp = 2024-06-26 12:01:08.919",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "offramp",
      "category": "eligibility",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0013 Determine Relationship Type",
      "description": "If the EP series is 130 (130 \u2013 139) and it was submitted on a VA-686c form, the relationship type is spouse or child(ren).",
      "use_case_ref": "UC-02: Evaluate Dependent(s) And UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1 MR Part III, iii, 5.G.37.a (b)(c); 5.G.38-42",
      "action": "evaluate",
      "category": "eligibility",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0015.1 DFAS Cutoff Date",
      "description": "Call and read the cutoff dates and get the current cutoff date which is the one for the specific month and if the current time is between the cutoff date and the cutoff date plus one hour, RBPS will exit and not read any Procs. If there is an issue retrieving the cutoff date for the current month, error will be reported in emails received by the development team. Note: reading the cutoff date will return values for both date and time.",
      "use_case_ref": "SR 1205913",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "military_pay",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0015a Military Retired Pay",
      "description": "If Veteran is in receipt of Military Retired Pay, process the claim as per Military Pay Requirements in Requirement Specification Document (RSD), Attachment F.",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "military_pay",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0015b Military Retired Pay \u2013 Additional Information",
      "description": "Significant updates were made to the Withholding checks process for RBPS. These are included in the attached Appendix A.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "military_pay",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0016 Attorney Fee Agreement",
      "description": "If Veteran's running award has Attorney Fee Agreement, send claim for exception process and record reasons. \"Auto Dependency Processing Reject Reason -Veteran has an Attorney fee agreement. Please review.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "attorney_fee",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017 Veteran Awarded Pension",
      "description": "Determine whether the Veteran is currently in receipt of a Pension award, and If true and Pension Processing is turned on, follow steps 17.1 through 17.9. If true and Pension Processing is turned off, send claim for exception processing and validate Station of Jurisdiction is set to the Pension Management Center associated with the veteran's Regional Office. If false, process the claim as normal/Non-Pension",
      "use_case_ref": "WSCR 2765 Rqmt 1",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.1 Pension Determination",
      "description": "When Pension Processing is on: If either the last current award line or a future (proposed) award line is a Pension award, add dependent(s) to Pension awards when the dependent(s) has no income and net worth does not exceed limit.",
      "use_case_ref": "WSCR 2765 Rqmt 1.a",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.1a Pension - Added Dependent has Income",
      "description": "When Pension Processing is on: On Veteran's Pension award, if added dependent(s) have income, RBPS will send the claim for manual processing and present the message: \"PMC \u2013 Dependent has income, development required\" Note: The determination to set the claim to manual will only be based upon the new added dependent regardless of the income status of the existing dependents on the award.",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.1b Pension - Added Dependent does not have Income",
      "description": "When Pension Processing is on: On Veteran's Pension award, if added dependent(s) do not have income and do not have previous income recorded, RBPS will continue processing to add the dependent(s) on the award.",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "process",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.1c Pension - Dependent Has No End Date for Income Recorded",
      "description": "When Pension Processing is on: On Veteran's Pension award, if any dependent has income recorded and the veteran submits \"N\" for has no income, set the claim to manual if the dependent has income recorded (and not ended) from the effective date forward.",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.1d Pension - Net Worth Over Limit",
      "description": "When Pension Processing is on: If Veteran's net worth exceeds the limit and is over $130,773, RBPS will send the claim for manual processing and present the message: \"PMC - Net worth exceeds limit, development required\"",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.2a Pension - Net Worth Over Limit Reject Reason",
      "description": "When Pension Processing is on: If the claim is sent for manual processing because the Veteran's net worth exceeds the limit on Pension award, set the reject reason to: \"PMC - Net worth exceeds limit\"",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.2b Pension - Dependent Has Income Reject Reason",
      "description": "When Pension Processing is on: If the claim is sent for manual processing because the dependent has income, set the reject reason to: \"PMC \u2013 Dependent has income\"",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.2c Pension - Net Worth Previously A Bar",
      "description": "When Pension Processing is on: If Veteran's existing net worth exceeds the limit of $130,773 and the decision \"net worth is a bar\" has been recorded, send the claim for manual processing and present the message: \"PMC \u2013 Net worth previously a bar, development required\"",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.2d Pension - Dependency Claim for Adding Dependent",
      "description": "When Pension Processing is on: If Pension dependency claim is for adding dependent(s) prior to 12/01/2020, reject the claim for manual processing and present the message: \"PMC \u2013 Adjustment involves two calendar years, review of income and net worth required\" Note: BEP Services will attempt to store this value so that only a data update will be needed each year. As this data varies from year to year, it will be stored as a variable.",
      "use_case_ref": "SR 1205308",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.3 Set Pension SOJ",
      "description": "When Pension Processing is on: If the claim is sent for exception processing due to Veteran's Pension award, confirm that the Station of Jurisdiction (SOJ) is a Pension Management Center (PMC). If it is not, transfer the claim to the Pension Management Center (PMC) associated with the Regional Office (RO) for the claim.",
      "use_case_ref": "WSCR 2765 Rqmt 1.a.ii",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.4 Set Pension Reject Claim Label",
      "description": "When Pension Processing is on: If the claim is sent for exception processing due to Veteran's Pension award, set the reject claim label as follows: PMC Automated Dependency 686c, PMC Automated Dependency 686c Reject, PMC Automated School Attendance 674, PMC Automated School Attendance 674 Reject, PMC eBenefits Dependency Adjustment, PMC Automated Dependency 686c Reject, PMC eBenefits School Attendance, PMC Automated School Attendance 674 Reject, PMC Phone Dependency Adjustment, PMC Automated Dependency 686c Reject, PMC Phone Dependency Adjustment Exception, PMC Automated Dependency 686c Reject, PMC Phone School Attendance, PMC Automated School Attendance 674 Reject, PMC Phone School Attendance Exception, PMC Automated School Attendance 674 Reject",
      "use_case_ref": "WSCR 2765 Rqmt 1.a.iii",
      "laws_regulations": "PMC Automated Dependency 686c Reject",
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.5 Veteran Pension or Survivor under 30% Disability Rating Exception",
      "description": "When Pension Processing is on: Any RBPS Pension dependency claims sent for manual review based on a disability rating less than 30% service connected, should produce and store the exception text: \"Veterans Pension or Survivor Award with under 30 Percent Rating\"",
      "use_case_ref": "SR 1294396",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.6 Veteran Pension or Survivor with 30% or greater Disability Rating",
      "description": "When Pension Processing is on: Any RBPS Pension or Survivor beneficiary dependency claims where the disability rating is at 30% service connected or greater should process the claim through automated processing rules (RBPS). If in that processing there is a recent rating resulting in an FCDR, set the claim to manual and present the message: \"Current version of RBPS cannot calculate event date of Pension Dependency Adjustment, please process manually\" Note: This would be temporary until RBPS can calculate the dependent date based on pension rules, which do not consider a recent rating.",
      "use_case_ref": "SR 1294396",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.7 Pension Award higher than Compensation Award",
      "description": "When Pension Processing is on: If Pension award becomes higher than Compensation award after generation due to the addition of dependent(s), set the claim to manual review. Add exception text: \"Award switching from Compensation to Pension due to addition of dependents, please process manually\" Assign the claim to appropriate PMC locations and change the claim label to the appropriate PMC \"reject\" label.",
      "use_case_ref": "SR 1294396",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.8 Compensation Award higher than Pension Award",
      "description": "When Pension Processing is on: If Compensation award becomes higher than Pension Award after generation due to the addition of dependent(s), set the claim to manual review. Add exception text: \"Award switching from Pension to Compensation due to addition of dependents, please process manually\" Do not change the assigned station so that it will get assigned for Compensation processing. Apply the appropriate \"reject\" claim label (non-PMC).",
      "use_case_ref": "SR 1294396",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0017.9 Pension Spouse Removal",
      "description": "When Pension Processing is on: On Veteran's Pension award, all spouse removals must be set to manual review and present the message: \"PMC - Spouse is being removed\"",
      "use_case_ref": "SR 1294396",
      "laws_regulations": null,
      "action": "offramp",
      "category": "pension",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0100 Dependent Data",
      "description": "Each dependent must have a date of birth, and first and last name. (Last name shall not be matched but should be present). \"Auto Dependency Processing Reject Reason -Child last name is not provided. Please review.\" \"Auto Dependency Processing Reject Reason - Spouse last name is not provided. Please review.\"",
      "use_case_ref": "UC-02: Evaluate Dependent(s)",
      "laws_regulations": "38 CFR 3.50; M21-1 MR Part III, iii5.A.1c",
      "action": "reject",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0101 Dependent Data Match",
      "description": "Search on dependent's SSN; if a match is found and the name and DOB also match, use that participant record. The claim is not eligible for automated processing if the SSN matches a record but either the first name or date of birth does not match. The claim is not eligible for automated processing if the date of birth matches a record but the first does not match. Send to exception processing and record the reason. \"Auto Dependency Processing Reject Reason -Submitted SSN/First Name/DOB does not match corporate record for dependent FIRSTNAME LASTNAME. Please review.\"",
      "use_case_ref": "UC-02: Evaluate Dependent(s)",
      "laws_regulations": "M21-1MR III.iii.5.B.6; M21-1MR III,iii.5.F.30 38CFR 3.1; 38 CFR3.57",
      "action": "reject",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0101.1",
      "description": "If the dependent SSN does not match a corporate record: Review Veteran's existing dependents, and match on date of birth only. If date of birth does not match, follow process to add the dependent (person record). If date of birth matches and SSN does not (SSN is blank or different), send to exception processing and record the reason. \"Auto Dependency Processing Reject Reason -Submitted SSN/First Name/DOB does not match corporate record for dependent FIRSTNAME LASTNAME. Please review.\"",
      "use_case_ref": "UC-02: Evaluate Dependent(s)",
      "laws_regulations": "M21-1MR III.iii.5.B.6; M21-1MR III,iii.5.F.30 38CFR 3.1; 38 CFR3.57",
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0101.2 Existing Dependent Check",
      "description": "RBPS checks that an existing dependent does not have the same birthdate and set those to manual, as any multiple births should be submitted at the same time. Note sent: \"Existing dependency decisions exist for this veteran dependent with the same birthdate. Please review to avoid duplicate dependent for veteran\".",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0102.1 Veteran Combined Disability Rating",
      "description": "Less than 30% service connected disability: IF If the veteran has never been 30% or more, Then: Add the dependent relationship and send denial letter. If letter fails for any reason, set the Note to: \"RBPS letter failed to generate; Veteran is under 30% and is not eligible to add dependents to award. Please send notification letter to Veteran and clear EP.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": "M21-1MR III,iii.5.A.1",
      "action": "reject",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0102.3 Veteran Combined Disability Rating",
      "description": "30% or more service connected disability: IF If the veteran was 30% and is not 30% from each dependent's effective date forward, Then: Add the dependent relationship and send denial letter. If letter fails, set the Note to: \"RBPS letter failed to generate; Veteran is no longer 30% or higher and is not eligible to add dependents to award. Please send notification letter to Veteran and clear EP.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "reject",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0102.4 Determine Allowable Date",
      "description": "1. For Prior School Term Processing only: determine Allowable Date as follows: Determine claim date minus one year (365 days). Determine First Change Date of a Rating (FCDR) per CP0125: (any rating promulgated between claim date and claim date less 365 days). If there is no FCDR, the FCDR field will be blank. Determine Veteran's earliest 30% SC or more rating Effective Date. Calculate the earliest date of Claim Date minus one year, or FCDR. Compare that date to veteran's earliest 30% SC Effective Date. If the date is earlier than the 30% SC Effective Date the Allowable Date is 30% SC Effective Date otherwise: the Allowable Date is (d) \u2013 the earliest of FCDR or Claim Date less one year.",
      "use_case_ref": "WSCR 2370 \u2013 Definitions and (1.2)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0102.5a RBPS Letter Regeneration",
      "description": "There is a current process run from the RBPS dashboard to rerun letters; however this is a manual process and delays the sending/uploading of letters. To improve this, a feature was added to RBPS to regenerate the letters at 5 pm CT so that any letters that failed will be rerun before the transfer to the Print team. The letters that failed are rerun from 5pm CT the day before through 5pm CT the current day.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0102.5b RBPS Letter Checks",
      "description": "When Letter Regeneration is processing (see 102.5a), RBPS checks that no other award action has occurred since date/time of the letter failure. This would include: 1. Dependency decision is added or updated. 2. Proposed or Authorized award. 3. Submission to RBPS (Proc) has gone to complete. 4. Award is Suspended 5. Award is terminated",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0103 Determine Current Award Status of Dependent",
      "description": "Compare the dependent information submitted on the claim to the Veterans' dependent information in the corporate database. The records must be an exact match on SSN, date of birth, and first name. If the dependent is a spouse or a minor child(ren) and is already on the award the spouse or minor child(ren) is, sent for exception processing. \"Auto Dependency Processing Reject Reason -The spouse or minor child already exists on award. Please review.\"",
      "use_case_ref": "UC-02: Evaluate Dependent(s)",
      "laws_regulations": "M21-1MR III.iii.5.",
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0105 Evaluate Veteran Previous Marriage",
      "description": "If the current marriage is the only marriage for Veteran, continue processing. If the Veteran has been previously married, and the latest prior marriage has been terminated prior to the begin date of the current marriage, continue; else send claims to exception processing and record the reason for exception. \"Auto Dependency Processing Reject Reason -Submitted Veteran's prior marriage date(s) do not terminate before date of current marriage. Please review.\"",
      "use_case_ref": "UC-05: Evaluate Spouse",
      "laws_regulations": "M21-1MR III,iii.5.B.5.d, f, g; CFR 3.205-3.211",
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0106 Evaluate Spouse Previous Marriage",
      "description": "If the current marriage is the only marriage for the spouse continue processing. If the spouse has been previously married, and the latest prior marriage has been terminated prior to the begin date of the current marriage, continue processing; else send for exception processing. \"Auto Dependency Processing Reject Reason -Submitted spouse's prior marriage date(s) do not terminate before date of current marriage. Please review.\"",
      "use_case_ref": "UC-05: Evaluate Spouse",
      "laws_regulations": "M21-1MR III.iii.5B.e, f",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0107 Determine Spouse Award Event Date",
      "description": "If the Veteran's current marriage occurred prior to receiving a 30% disability rating, the Veteran has one year from the date he received 30% to add a spouse with the event date equal to the date of the 30% rating. Otherwise, if the Veteran's marriage occurred after the Veteran received a 30% disability rating; the Veteran has 365 days from the marriage date to add a spouse with the event date equal to the marriage date. If the marriage occurred over 365 days ago, the event date of the award will be the date the claim was received.",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": "38 CFR 3.400 & 3.401; M21-1 MR III,v.2A.1.a",
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0108 Evaluate Childs Relationship Type",
      "description": "If the child is a biological child of the Veteran, continue to CP0109, Evaluate Biological Child. If the Veteran has adopted the child, continue to CP0110, Evaluate Adopted child. If the child is a Stepchild of the Veteran, continue to CP0111, Evaluate Stepchild.",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1 MR Part III, iii,5.G.37.a (b)(c); 5.G.38-42",
      "action": "process",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0109 Evaluate Biological Child",
      "description": "If an automated decision can be determined for a biological child, processing continues to CP0112 -Child's Previous Marriage.",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57",
      "action": "process",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0110 Evaluate an Adopted Child",
      "description": "If the child is adopted, an automated decision cannot be determined for the child. Record the reason for exception. \"Auto Dependency Processing Reject Reason - Child: \"+ the last name of 'the Child' +\", \"+the first name of 'the Child' +\" reported as adopted. Please develop for adoption paperwork.\"",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1MR III, iii.5.G38.",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0111 Evaluate a Stepchild",
      "description": "When adding a step child that was not previously on the award, if marriage date is not found, send for exception processing. Exception Message: \"Auto Dependency Processing Reject Reason -Date of marriage of the Veteran was not provided for step child. Please Review.\"",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0112 Evaluate Child's Marriage",
      "description": "If the child is married or has been previously married, an automated decision cannot be determined for the child. Send claim for exception processing and record the reason. Exception Message: \"Auto Dependency Processing Reject Reason -Child reported as previously married. Please review.\" Exception Message: \"Auto Dependency Processing Reject Reason -Child reported as married. Please Review.\"",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1MR III,iii.5F.30.c",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0112 Evaluate Child\u2019s Marriage",
      "description": "If the child is married or has been previously married, an automated decision cannot be determined for the child. Send claim for exception processing and record the reason. Exception Message: \u201cAuto Dependency Processing Reject Reason -Child reported as previously married. Please review.\u201d Exception Message: \u201cAuto Dependency Processing Reject Reason -Child reported as married. Please Review.\u201d",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1MR III,iii.5F.30.c",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0113 Denying of Children",
      "description": "If the child is >=18 and < 23, is not in school and is not indicated to be seriously disabled, deny the child and include denial in correspondence. Set Award status to Not an Award Dependent. Set the dependency decision type to Over 18, Not in School or Helpless. If the child is >= 23, is not indicated to be seriously disabled, deny the child and include denial in correspondence. Set Award status to Not an Award Dependent. Set the dependency decision type to Rated not Helpless",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0114 Child's Address",
      "description": "An address must be provided. If the biological child does not live with the Veteran, If address is provided, continue processing. If address is NOT provided, an automated decision cannot be determined for the child. Send claim for exception processing and record the reason. \"Auto Dependency Processing Reject Reason -Child: \"+ the last name of 'the Child' +\", \"+the first name of 'the Child' +\" reported as not living with Veteran but no address for child was submitted. Please review.\"",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "M21-1 MR III, iii.5.F.31.b",
      "action": "process",
      "category": "award_calculation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0114 Child\u2019s Address",
      "description": "An address must be provided. If the biological child does not live with the Veteran, If address is provided, continue processing. If address is NOT provided, an automated decision cannot be determined for the child. Send claim for exception processing and record the reason. \u201cAuto Dependency Processing Reject Reason -Child: \"+ the last name of 'the Child' +\", \"+the first name of 'the Child' +\" reported as not living with Veteran but no address for child was submitted. Please review.\u201d",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "M21-1 MR III, iii.5.F.31.b",
      "action": "process",
      "category": "award_calculation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0115 - A Child's Age and Seriously Disabled Check",
      "description": "If the child is 18 or older on FCDR and seriously disabled, send for exception processing. Exception Message: Auto Dependency Processing Reject Reason- Child: \" + the last name of 'the Child' + \", \" + the first name of 'the Child' + \"is reported as seriously disabled. Please review.\"",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1 MR III,iii.6A.1",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0115 - A Child\u2019s Age and Seriously Disabled Check",
      "description": "If the child is 18 or older on FCDR and seriously disabled, send for exception processing. Exception Message: Auto Dependency Processing Reject Reason- Child: \" + the last name of 'the Child' + \", \" + the first name of 'the Child' + \u201cis reported as seriously disabled. Please review.\u201d",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1 MR III,iii.6A.1",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0115 - B Child's Age and Seriously Disabled Check",
      "description": "If the child is 18 or older on Date of Claim and seriously disabled, send for exception processing. Exception Message: Auto Dependency Processing Reject Reason- Child: \" + the last name of 'the Child' + \", \" + the first name of 'the Child' + \" is reported as seriously disabled. Please review.\"",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1 MR III,iii.6A.1",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0115 - B Child\u2019s Age and Seriously Disabled Check",
      "description": "If the child is 18 or older on Date of Claim and seriously disabled, send for exception processing. Exception Message: Auto Dependency Processing Reject Reason- Child: \" + the last name of 'the Child' + \", \" + the first name of 'the Child' + \" is reported as seriously disabled. Please review.\u201d",
      "use_case_ref": "UC-03: Evaluate Child(ren)",
      "laws_regulations": "38 CFR 3.57; M21-1 MR III,iii.6A.1",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0116 Determine Biological Minor Child Award Event Date",
      "description": "existing functionality If the birth of the Veteran's child occurred prior to receiving a >= 30% combined service connected disability rating, the Veteran has one year (365 days) from the date he received 30% to add the child with the effective date equal to the date the >= 30% combined service connected rating was received. If the rating occurred after 365 days, the rating will not be used to calculate the award effective date. Otherwise, if the child's birth occurred after the Veteran received >= 30% combined service-connected disability rating, the Veteran has one year from the child's birthday to add the child with the effective date equal to the child's birthday. If the child's birth occurred over 365 days before or the same as the claim date, the effective date of the award decision will be the date of claim.",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": "38 CFR 3.400 & 3.401; M21-1 MR III,v.2A.1.a",
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0117 Determine Step Minor Child Award Event Date",
      "description": "existing functionality If the birth of the Veteran's child [or parent's marriage to the Veteran] occurred prior to receiving a >= 30% combined service connected disability rating, the Veteran has one year (365 days) from the date he received 30% to add the child with the effective date equal to the date the >= 30% combined service connected rating was received. If the rating occurred over 365 days ago, the date of claim will be used to determine the effective date of the award decision. Otherwise, if the child's birth [or parent's marriage to the Veteran] occurred after the Veteran received a >= 30% combined service connected disability rating, the Veteran has one year (365 days) from the child's birthday [or parent's marriage to the Veteran] to add the child with the effective date equal to the child's birthday [or parent's marriage to the Veteran]. If the child's birth or parent's marriage to the Veteran] occurred over 365 days before or the same as the claim date, the claim date will be used to determine the effective date.",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": "38 CFR 3.400 & 3.401; M21-1 MR III,v.2A.1.a",
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0117.2 Leap Year",
      "description": "All dates in RBPS shall be calculated properly with respect to leap years and non-leap years. If the date is a leap day (2/29) and the number of years to be added is not divisible by 4, then one day is added to it to result in a date of 3/1, with the years added.",
      "use_case_ref": "SR 1205510",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0118 Identify Data Needed for School Child Evaluation",
      "description": "The following validations are performed: current term begin date and current term end date must not be null. I.e., Verify that the current term begin date and the current term end date are not null. If either are null, set to manual, with the following message: \"Course begin or end date is null. Please review.\"",
      "use_case_ref": "UC-04: School Verification Accreditation/Attendance and existing functionality per CR2321 \u2013 (1.3.1)",
      "laws_regulations": "M21-1MR III,iii.6.A.2",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0118.2 School Child Evaluation \u2013 Previous Term",
      "description": "If a prior school term is submitted, validate the following information: Prior Begin Date, Prior End Date and Current Begin Date must be provided. Prior School Term Begin Date must be prior to today's date. End Date of Prior School Term must be prior to the Begin Date of Current School Term. Continue processing if Prior School Term validations pass. If any Prior School Term validations fail, IGNORE the Prior School Term and process Current School Term.",
      "use_case_ref": "WSCR 2321 \u2013 (1.3.1)",
      "laws_regulations": null,
      "action": "process",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0118.3 School Child Attendance Information - - Verification",
      "description": "SCHOOL ATTENDANCE INFORMATION Create a place to store field #10A \u2013 MY DEPENDENT HAS STOPPED SCHOOL CONTINUOUSLY If the field is YES, set the claim to manual with a note that includes \"Student is not attending continuously, please review\" No dates need to be reviewed in this situation. If the field is NO, continue current process. Review the 5 month rule. Create a place to store field #10B \u2013 IS THE SCHOOL ACCREDITED? If the field is YES, RBPS shall continue to process the claim. Otherwise, if the field is NO or empty, set to manual processing with a note that includes \"School is listed as not accredited\"",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0119 Evaluate United States Tuition Payment or Assistance",
      "description": "If the tuition and/or an allowance for the student's education or training is being paid by VA Dependents Educational Assistance (DEA), the Federal Employee's Compensation Act, or any other agency or program of the United States government, the child is not eligible to be added to the award as a school child. Send to exception processing and record the reason. Exception message: \"Auto Dependency Processing Reject Reason - Reported that child's tuition/allowance is being paid by US government. Please review.\"",
      "use_case_ref": "UC-04: School Verification Accreditation/Attendance",
      "laws_regulations": "M21-1MR III,iii.6.A.2.g; 38 USC Chap. 30,31,33 & 35",
      "action": "reject",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0121a - Validate Prior School Term When No Prior School Dates Exist",
      "description": "IF School Term Start Date is within 5 months from child's 18th Birthday AND priorSchoolTermValidateDataOnly is false THEN Set the claim to manual and create a Claim Note with: \"School term submitted without prior term or the prior term submitted is not valid. Need additional information for continuous school term determination due to child turning 18.\"",
      "use_case_ref": "SR 1187937",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0121b - Validate Prior School Term When Prior School Dates Exist",
      "description": "IF School Term Start Date is within 5 months from child's 18th Birthday AND priorSchoolTermValidateDataOnly is true AND 18th birthday is after prior school end date THEN Set the claim to manual and create a Claim Note with: \"School and Prior Term submitted, need additional information for continuous school term determination due to child turning 18.\" Note: Rules 121a and 121b will be run before all the other School Term rules.",
      "use_case_ref": "SR 1187937",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0121c Prior Term Date Clarification",
      "description": "Less than or equal to 5 months doesn't affect continuous school term, which is determined as less than or equal to five months break. Message sent: \"Set to manual processing due to current and prior school terms dates overlapping or does not match previous Prior term recorded on the award.\"",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0121d Existing Term Overlap Appendix Reference",
      "description": "Issues arising from overlapping school terms are addressed in \"Appendix to RBPS Rules Document: Existing Term Overlapping Prior School Term for explanation\".",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0121e Child Near 18 Determination",
      "description": "Originally, claims were set to manual if school child turns 18 near received date with the following message: continuous school term cannot be set - either allow the addition of another denial and generate the award or don't generate the award and send letter. Modified to set school child to manual if child turns 18 within 3 months of term start date because continuous school term cannot be set. 1. \"Child turns 18 near received date\" was agreed to be changed to near term start date. 2. Compensation Services agreed that if school start date is three months or less after the dependent turns 18 is the same as \"turns 18 near received date\". 3. Compensation Services agreed that the claim should be set to manual and include in the note: \"Continuous school term could not be determined\".",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0121f Handling of Future School Term Start Date",
      "description": "If claim has School Term Start date set to a future date, set to manual so a 674b can be sent to a VSR for further review.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0124 Determine Rating Effective Date",
      "description": "The Rating Effective Date is the earliest effective date where the Veteran's combined evaluation is 30% or more service connected disability.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0125 Determine FCDR",
      "description": "Existing Functionality First Change Date of a Rating (FCDR) is defined as: If any ratings have been done within 365 days of the claim date, determine the earliest date of: The effective date of an increase in the service combined percent that is on or after the rating effective date. The effective date of an earlier 30% or greater SC combined evaluation. The effective date of any new or increasing SC disability decision, an IU grant or an SMC grant. If more than one of any of these exists, use the earliest one. If the date found in c is before the Rating Effective Date, then set FCDR to the Rating Effective Date. If none, or no ratings within 365 days, then the field will be blank.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0127 Exception processing",
      "description": "Information regarding all exceptions to include business rules failed/passed and corresponding exception code shall be sent Modern Awards Processing Development (MAPD).",
      "use_case_ref": "UC-07: Process Exception",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128 Generate Correspondence",
      "description": "Correspondence will be generated and correct template applied, in order to populate letter for decisions and development actions. A copy of the correspondence will be sent to Virtual VA and letters will be forwarded for daily mailing.",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.1 Template Rules (Heading)",
      "description": "The following rules apply to the heading on each of the templates: The Regional Office Name and Mailing Address is at the top of the letter, under the Department of Veterans Affairs heading. The date of the letter is set to the current date (Month DD, YYYY format and is printed in the upper right corner across from the Region Office Name. In Reply Refer To: The case number is inserted on the first line; Veteran's Last Name, First Name, and Middle Name on second line. The Veteran's Last Name, and up to six lines of their address are printed below the Regional Office's name and address. If a fiduciary is available for a Veteran, the following information is included before the name and address of the Veteran: Fiduciary Attention Text, Fiduciary Name, Fiduciary Prepositional Phrase (e.g., 'Custodian of'). The Claimant's First and Last Name are printed in the salutation line (after the word 'Dear'). The Claim Received Date is inserted into the first paragraph. The format for the date is Month DD, YYYY.",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.2 Template Rules (Letter Body)",
      "description": "The following rules apply to the body of the letter on each of the templates: After Veteran's salutation and an opening sentence \"We made a decision on your claim for additional benefits for your dependents received on \"date of claim e.g. November 11, 2011,\" the following text is inserted in the next row: This notification letter only pertains to the dependency claim we received on the date above. Any additional pending dependency claims will be decided separately. The 'If You Have Questions or Need Assistance' section is customized depending upon whether or not the Veteran lives in the US. The verbiage for each condition (US or non-US) is listed in the template. The VA file number is inserted into the 'If You Have Questions or Need Assistance' section. The last paragraph of the letter varies depending upon whether or not the Veteran has a Power of Attorney (POA). The template provides the verbiage to be used in each instance. If the Veteran has a POA, the name of the POA is inserted into the closing paragraph. If the Veteran does not have a POA, the wording of the paragraph is static. If the letter is more than 1 page long, the page number, file number, and Veteran's Name (Last, First Middle) is printed at the top of each subsequent page.",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.3 Template Rules (Award Granted)",
      "description": "Existing Functionality The following rules are specific to the Award Letter Template and should be used in conjunction with rules CP0128.1 and CP0128.2 when generating a letter for an Award Granted. In the 'Your Award Amount and Payment Change Date' section, a grid is inserted which contains the Monthly Award Amount, Payment Change Date, and Reason for Change for the current change in award and all future events that will impact the current award (e.g., date a child will be removed from an award). Dollar signs are printed in front of the Monthly Award Amount. Dates are printed in MMM DD, YYYY format. The 'You Can Expect Payment' section is tailored depending on whether the Veteran/Claimant has set up EFT or banking information. Paragraphs 500A and 500A1 are used when the Veteran/Claimant has set up Electronic Funds Transfer (EFT) payments. Paragraphs 500A and 500B are used when the Veteran/Claimant is receiving a paper check. NOTE: After March 1, 2013, a claimant will not receive benefits if automated payments are not set up. The 'What We Decided' section is customized with 2 separate variables: The first sentence includes the total number of dependents on the award, including the dependents that were just added, and the newly added dependents whose omnibus date is in the future. The second sentence includes the name and Award effective dates of the dependents that were added from this claim submission",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.4 Template Rules (Award Denied)",
      "description": "The following rules apply to the Deny Letter Template only and should be used in conjunction with rules CP0128.1 and CP0128.2 when generating a letter for an Award Denied. The 'What We Decided' section is customized depending on if the Veteran is rated above or below 30% service connected disabled. If the Veteran is less than 30% service connected disabled, use the static text as per the template. If the Veteran is 30% or more service connected disabled, insert the name of the denied dependent and the reason for the denial",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.5 Generate Correspondence (Award Grant/Deny)",
      "description": "If a claim has resulted in both an award and a denial, generate a letter using the Grant/Deny Letter Template and should be used in conjunction with rules CP0128.1 and CP0128.2 when generating a letter for an Award Granted/Denied. In the 'Your Award Amount and Payment Change Date' section, a grid is inserted which contains the Monthly Award Amount, Payment Change Date, and Reason for Change for the current change in award and all future events that will impact the current award (e.g., date a child will be removed from an award). Dollar signs are printed in front of the Monthly Award Amount. Dates are printed in MMM DD, YYYY format. The 'You Can Expect Payment' section is tailored depending on whether the Veteran/Claimant has set up EFT or banking information. Paragraphs 500A and 500A1 are used when the Veteran/Claimant has set up Electronic Funds Transfer (EFT) payments. Paragraphs 500A and 500B are used when the Veteran/Claimant is receiving a paper check. The 'What We Decided' section is customized using the count of the total number of dependents claimed (including the dependents that were just added), followed by the name and effective dates of the dependent that were just added. The 'What We Decided' section also includes a paragraph to explain the denied part of the claim. Insert the name of the denied dependent and the reason for the denial into this paragraph.",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.6 Generate Correspondence (Military Pay Award Grant/Deny)",
      "description": "The following rules are specific to the Award/deny Letter Template for including Military Pay and should be used in conjunction with rules CP0128.1, CP0128.2, CP0128.4, and CP0128.5 when generating a letter for an Award which includes Military Pay information. If VA withheld benefits, after \u2018Your Award Amount and Payment Change Date\u2019 grid, insert a new section \u2018Why Have We Withheld Benefits?\u2019 \u201cYou are not allowed to receive full military retired pay and full VA compensation at the same time. The following will provide an explanation of how this works: If your VA compensation is less than your retired pay, you will receive compensation payments. The service department will pay you the difference between your compensation and your retired pay. If your VA compensation is greater than your retired pay, we will pay you compensation, and you will not receive retired pay. For now, we must withhold (if any changed award lines have a new net award >0 on the given effective date, use \u201cpart\u201d, if all changed award lines have a new net award =0, through the \u201cTo\u201d date of the retired pay withholding \u201call\u201d) of your compensation until ( \u201dTo Date\u201d for MOST RECENT military retired pay adjustment decision). We must do this to prevent a double payment. By working together with the service department, we will make sure you get your full combined payment. Important information: VA compensation is not taxable. Please contact the Internal Revenue Service for tax information. Concurrent Receipt of VA Compensation and Military Retired Pay You may be eligible for full or partial concurrent receipt of VA compensation and military retired pay under the Combat-Related Special Compensation (CRSC) and/or Concurrent Retired and Disability Pay (CRDP) programs. Your retired pay center (RPC) has been notified of this award of VA compensation. If your RPC determines the withholdings from your VA compensation should be retroactively adjusted due to CRSC/CRDP eligibility; VA will be notified and will adjust your VA compensation accordingly. More information on CRSC and CRDP can be found at the following web site: http://www.dfas.mil/rapay/disability/crscandcrdp.html, or by calling your RPC as shown below: Defense Finance and Accounting Service (DFAS): 1-800-321-1080 United States Coast Guard: 1-800-772-8724 Public Health Service: 1-800-638-8744",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0128.7 Template Rules (All POA Letters)",
      "description": "For all POA Letters, the station or location ID will be changed to the station of jurisdiction of the Veteran instead. The rest of the existing processes will take care of sorting and printing. BEP Services will print the POA letters and separate them by regional office (existing processing). POA Letters for all claims will be grouped with Station A, the Station of Jurisdiction of the Veteran. Verify that the POA Letter file name is in the following format: P{file_number}#000006{station_of_jurisdiction}.pdf",
      "use_case_ref": "SR 1002423",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0129 Determine Course Start Date",
      "description": "existing functionality Determine Current Course start date and Course End Date for student. If Current Course Start Date is missing send for exception processing. Exception Message: \"Auto Dependency Processing Reject Reason - Dependent: \"+ the last name of 'the Child' +\", \"+the first name of 'the Child' +\" current course start date was not provided. Please review.\" Note: See CP0225 through CP0237 for Prior School Term Rules",
      "use_case_ref": "UC-04: School Validation Accreditation/Attendance",
      "laws_regulations": "M21-1 MR III.iii.6.A.2.a",
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0129.1 Number of Dependents on Award",
      "description": "Determine the number of children currently on Veterans award. If greater than 7, send for exception processing. Allow the addition of a spouse, if there is not a spouse currently on the award, regardless of the number of children on the award. Exception Message: \"Auto Dependency Processing Reject Reason - The number of children currently on Award is > 7. Please review.\" Note: Ensure this new rule is not bypassed in any scenario.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0130 Number of Dependents Allowable",
      "description": "Determine the number of dependents claimed by Veteran. If greater than 20, send for exception processing. Exception Message: \"Auto Dependency Processing Reject Reason - The number of Dependents on Award is > 20. Please review.\"",
      "use_case_ref": "UC-02: Evaluate Dependents",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0131 Send Information to Awards Service",
      "description": "RBPS will be providing information to Awards Service to record the dependency decision and process the award.",
      "use_case_ref": "UC-09: Send information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0132 Awards Service Sends Information/Data to RBPS",
      "description": "Awards Service will be providing information to RBPS for correspondence letters.",
      "use_case_ref": "UC-08: Generate Correspondence",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134. 2 Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is >= 18 and < 23 on FCDR and either prior and/or current school term(s) submitted, select School Child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 3
    },
    {
      "rule_id": "CP0134.1 Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is < 18 on FCDR, select Minor child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.10 Determine Award Status",
      "description": "If Claim is received > 365 days of promulgation date then If child is >=23 on Date of Claim and not claimed to be seriously disabled select Not an Award Dependent.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.11 Determine Award Status",
      "description": "If Claim is received > 365 days of promulgation date then Select Spouse if the relationship type is spouse.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.12 Determine Award Status",
      "description": "If Claim is received <= 365 days of promulgation date then Select Spouse if the relationship type is spouse.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.2 Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is >= 18 and < 23 on FCDR and either prior and/or current school term(s) submitted, select School Child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus"
      ],
      "model_count": 1
    },
    {
      "rule_id": "CP0134.3 Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is >=18 and <23 on FCDR and not attending school and not claimed to be seriously disabled select Not an Award Dependent",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.4 Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is <18 on FCDR and attending school Create a minorSchoolChildAward and select School Child as dependency status type and to the expected graduation date of the current term as award end date. If all of the following conditions are Present: IF - the FCDR of 'the Veteran' is present - the age of 'the Child' on the FCDR of 'the Veteran' is less than 18 - 'the Child' is school child - the current term of 'the Child' is present THEN - set the dependency status type of 'the minorSchoolChildAward' to SCHOOL_CHILD; - set the dependency decision type of 'the minorSchoolChildAward' to SCHOOL_ATTENDANCE_BEGIN_DATE; - set the end date of 'the minorSchoolChildAward' to the expected graduation date of the current term of 'the Child'",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.4-a Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is < 18 on FCDR and attending school and has a previous term, select School Child. Create an Award (School term) and select School Child as dependency status type and to the expected graduation date of the current term as award end date. If all of the following conditions are True: IF - the FCDR of 'the Veteran' is present - the age of 'the Child' on the FCDR of the Veteran' is less than 18 - the Child' is school child - the current term of 'the Child' is present - the Child' has attended school last term THEN - set the dependency status type of 'the Award' to SCHOOL_CHILD - set the dependency decision type of 'the Award' to SCHOOL_ATTENDANCE_BEGIN_DATE - set the end date of 'the Award' to the expected graduation date of the current term of 'the Child'",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.4-b Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is < 18 on FCDR and has a previous term Create a 'PriorSchoolChild' award and select School Child as dependency status type and to the expected graduation date of the current term as award end date. If all of the following conditions are True: IF - the FCDR of 'the Veteran' is present - the age of 'the Child' on the FCDR of 'the Veteran' is less than 18 - the Child' is school child - the last term of 'the Child' is present THEN - set the dependency status type of 'PriorSchoolChild' to SCHOOL_CHILD - set the dependency decision type of 'PriorSchoolChild' to SCHOOL_ ATTENDANCE_BEGIN_DATE; - set the end date of 'PriorSchoolChild' to the course end date of the last term of 'the Child'",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.5 Determine Award Status",
      "description": "If claim is received <= 365 days of promulgation date then If child is >=23 on FCDR and not claimed to be seriously disabled select Not an Award Dependent.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.6 Determine Award Status",
      "description": "If Claim is received > 365 days of promulgation date then If child is < 18 on Date of Claim Select Minor Child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.7 Determine Award Status",
      "description": "If Claim is received > 365 days of promulgation date then If child is >= 18 and < 23 on Date of Claim and attending school select School Child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.8 Determine Award Status",
      "description": "If Claim is received > 365 days of promulgation date then If child is >=18 and <23 on Date of Claim and not attending school and not claimed to be seriously disabled select Not An Award Dependent",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0134.9 Determine Award Status",
      "description": "If Claim is received > 365 days of promulgation date then If child is <18 on Date of Claim and attending school select Minor to School Child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.1 Determine Award Decision",
      "description": "If Award Status = Minor Child, set decision = Eligible Minor Child",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.10 Determine Award Decision",
      "description": "If Date of Claim >= to 23rd birthday of child and not claimed as helpless/seriously disabled, set decision = Rated Not Helpless",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.11 Determine Award Decision",
      "description": "If Date of Claim >= 18th birthday and < 23rd birthday and not in school or not claimed as helpless/seriously disabled, set decision = Over 18 - Not in School or Helpless.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.2 Determine Award Decision",
      "description": "existing functionality If Award Status = School Child, set decision = School Attendance Begins",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.3 Determine Award Decision",
      "description": "For School Child set Decision End Date = Expected date of graduation",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.4 Determine Award Decision",
      "description": "If Award Status = Minor Child to School Child, set two decisions: Eligible Minor Child, School Attendance Begin Date",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.5 Determine Award Decision",
      "description": "If Award Status = Spouse, set decision = Dependency Established",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.6 Determine Award Decision",
      "description": "If removal reason = death, set decision = Death",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.7 Determine Award Decision",
      "description": "If removal reason = divorce, set decision = Marriage Terminated",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.8 Determine Award Decision",
      "description": "If Rating Effective Date >= to 23rd birthday of child and not claimed as helpless/seriously disabled, set decision = Rated Not Helpless",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0135.9 Determine Award Decision",
      "description": "If Rating Effective Date >= 18th birthday and < 23rd birthday and not in school or not claimed as helpless/seriously disabled, set decision = Over 18 -Not in School or Helpless.",
      "use_case_ref": "UC-09: Send Information to Award Service",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.1 Determine Event Date Spouse",
      "description": "If FCDR is NOT present: IF Claim received within 365 days after date of marriage And Date of Marriage is after Rating Effective date THEN Set the Event Date to the Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.2 Determine Event Date Spouse",
      "description": "If FCDR is NOT present: IF Claim received after Date of Marriage + 365 days THEN Set the Event Date to the Date of Claim",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.3-a Determine Event Date Spouse",
      "description": "If FCDR is present and is more than 365 days prior to the Date of Claim: IF Veteran's Marriage Date is before or the same as FCDR AND Veteran's Marriage Date is after Rating Effective date THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.3-b Determine Event Date Spouse",
      "description": "If FCDR is present and is more than 365 days prior to the Date of Claim: IF Veteran's Marriage Date is after FCDR AND Veteran's Marriage Date is within 365 days of Date of Claim THEN Set Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.3-c Determine Event Date Spouse",
      "description": "If FCDR is present and is more than 365 days prior to the Date of Claim: IF Veteran's Marriage Date is after FCDR AND Veteran's Marriage Date is before 365 days of Date of Claim THEN Set Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.4-a Determine Event Date Spouse",
      "description": "If FCDR is present and is within 365 days of the Date of Claim: IF Veteran's Marriage Date is within 365 days of Date of Claim after FCDR AND Veteran's Marriage Date is after Rating Effective date THEN Set Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.4-b Determine Event Date Spouse",
      "description": "If FCDR is present and is within 365 days of the Date of Claim: IF Veteran Marriage Date is before or the same as 365 days of Date of Claim AND Veteran's Marriage Date is after Rating Effective date THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0136.4-c Determine Event Date Spouse",
      "description": "If FCDR is present and is within 365 days of the Date of Claim: IF FCDR is same as Rating Effective date AND Veteran Marriage Date is within 365 days of Date of Claim AND Veteran's Marriage Date is before FCDR THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.1 Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim is received more than 365 days after Child's Date of Birth THEN Set Event Date = Date of Claim",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.10 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is more than 365 days prior to the Date of Claim: IF Child's Date of Birth is after FCDR AND Date of Marriage is before or the same as the FCDR THEN Set Event Date = Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.11 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is more than 365 days prior to the Date of Claim: IF Child's Date of Birth is before or the same as FCDR AND Date of Marriage is after FCDR THEN Set Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.12 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is more than 365 days prior to the Date of Claim: IF Child's Date of Birth is after FCDR AND Date of Marriage is after FCDR AND Date of Marriage is before or the same as Date of birth THEN Set Event Date = Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.13 Determine Event Date Minor Step Child",
      "description": "Rules CP0137.13 A through D is reduced to just one rule: IF All the following conditions are true: - the child type of 'the Child' is STEPCHILD - it is not true that 'the Child' is on award as minor child - the FCDR of 'the Veteran' is present - the marriage date of 'the Veteran' is present - the FCDR of 'the Veteran' is the rating effective date of 'the Veteran' - the birth date of 'the Child' is before or the same as the FCDR of 'the Veteran' - the marriage date of 'the Veteran' is before or the same as the FCDR of 'the Veteran' THEN - set the event date of 'the Award' to the FCDR of 'the Veteran'",
      "use_case_ref": "UC-06: Determine Award SR 1182451",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.14 Determine Event Step Child Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is within 365 days of the Date of Claim: IF Child's Date of Birth is within 365 days of Date of Claim AND Date of Marriage is within 365 days of Date of Claim AND Date of Marriage is before Date of birth THEN Set the Event Date = Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.15 Determine Event Date Minor Step Child",
      "description": "Stepchild IF All the following conditions are true: - the child type of 'the Child' is STEPCHILD - it is not true that 'the Child' is on award as minor child - the FCDR of 'the Veteran' is present - the marriage date of 'the Veteran' is present - the FCDR of 'the Veteran' is not the rating effective date of 'the Veteran' - 'the Veteran' claim received date is before or the same as the FCDR of 'the Veteran' plus 365 Days - the birth date of 'the Child' is before or the same as the FCDR of 'the Veteran' - 'the Veteran' claim received date is after the birth date of 'the Child' plus 365 Days - the marriage date of 'the Veteran' is before or the same as the FCDR of 'the Veteran' - 'the Veteran' claim received date is after the marriage date of 'the Veteran' plus 365 Days THEN - set the event date of 'the Award' to 'the Veteran' claim received date minus 365 days",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.16 Determine Event Date Minor Step Child",
      "description": "Stepchild IF All the following conditions are true: - The child type of 'the Child' is STEPCHILD - It is not true that 'the Child' is on award as minor child - The FCDR of 'the Veteran' is present - The marriage date of 'the Veteran' is present - The rating effective date of 'the Veteran' is not the FCDR of 'the Veteran' - 'The Veteran' claim received date is after the FCDR of 'the Veteran' plus 365 Days - The birth date of 'the Child' is before or the same as the FCDR of 'the Veteran' - The marriage date of 'the Veteran' is before or the same as the FCDR of 'the Veteran', THEN If The Veteran' claim received date minus 365 days is before or the same as the FCDR of 'the Veteran' Then Set the event date of 'the Award' to 'the Veteran' claim received date minus 365 days Else Set the event date of 'the Award' to the FCDR of 'the Veteran'",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.17 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is within 365 days of the Date of Claim: IF Child's Date of Birth is before 365 days of Date of Claim AND Date of Marriage is before 365 days of Date of Claim THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.18 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is within 365 days of the Date of Claim: IF Child's Date of Birth is before 365 days of Date of Claim AND Date of Marriage is within 365 days of Date of Claim THEN Set the Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.19 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is within 365 days of the Date of Claim: IF Child's Date of Birth is within 365 days of Date of Claim AND Date of Marriage is outside 365 days of Date of Claim THEN Set the Event Date = Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.2 Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim is received within 365 days of the Child's Date of Birth THEN Set Event Date = Child's Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.3-a Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to the Date of Claim: IF Child's Date of Birth is before or the same as the FCDR THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.3-b Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to the Date of Claim: IF Child's Date of Birth is after FCDR THEN Set Event Date = Child's Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.4-a Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is present and is within 365 days of the Date of Claim: IF Child's Date of Birth is within 365 days of Date of Claim AND Child's Date of Birth is after Rating Effective date THEN Set Event Date = Child's Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.4-b Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is present and is within 365 days of the Date of Claim: IF Child's Date of Birth is outside 365 days of Date of Claim THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.4-c Determine Event Date Minor Child",
      "description": "Biological Child If FCDR is present and is within 365 days of the Date of Claim: IF FCDR is same as Rating Effective Date AND Child's Date of Birth is within 365 days of Date of Claim AND Child's Date of Birth is before FCDR THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.5 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is NOT present: IF Stepchild's Date of Birth is after the Date of Veteran's Marriage AND Claim is received after 365 days of date of birth THEN Set Event Date = Date of Claim",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.6 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is NOT present: IF Stepchild's Date of Birth is before or the same as Date of Veteran's Marriage AND Claim is received within 365 days of date of marriage THEN Set Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.7 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is NOT present: IF Stepchild's Date of Birth is after the Date of Veteran's Marriage AND Claim is received within 365 days of date of birth AND Date of birth is after Rating Effective Date THEN Set Event Date = Date of Birth",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.8 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is NOT present: IF Step child date of birth is before or the same as the date of Marriage AND Claim is received more than 365 days after the Date of Veteran's Marriage THEN Set Event Date = Date of Claim",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0137.9 Determine Event Date Minor Step Child",
      "description": "Stepchild If FCDR is present and is more than 365 days prior to the Date of Claim: IF Child's Date of Birth is before or the same as the FCDR AND Date of Marriage is before or the same as the FCDR THEN Set Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139",
      "description": "The requirements defined in CP0139 and its' sub-paragraphs (Determine Event Date for School Child) shall only be used to process current school term decisions.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-a Determine Event Date School Child",
      "description": "Biological Child: If FCDR is NOT present: IF Claim received no more than 365 days after 18th birthday AND There is no End Date of Last Term AND Course Begin Date is no more than 5 months after 18th Birthday THEN Set the Event Date = Child's 18th Birthday",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-b Determine Event Date School Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim received no more than 365 days after 18th birthday, AND There is no End Date of Last Term AND Course Begin Date is more than 5 months after 18th Birthday THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-c Determine Event Date School Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim received no more than 365 days after End of Last Term AND Course Begin Date is no more than 5 months after End Date of Last Term THEN Set the Event Date = End Date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-d Determine Event Date School Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim received more than 365 days after End Date of Last Term AND Course Begin Date is no more than 5 months after End Date of Last Term THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-e Determine Event Date School Child",
      "description": "Biological Child If FCDR is NOT present: IF Course Begin Date is more than 5 months after End Date of Last Term AND Course Begin Date is no more than 365 days before or after the Date of Claim THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-f Determine Event Date School Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim received more than 365 days after 18th birthday, AND There is no End Date of Last Term AND Course Begin Date is no more than 365 days before or after the Date of Claim THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.1-g Determine Event Date School Child",
      "description": "Biological Child If FCDR is NOT present: IF Claim received more than 365 days of child's 18th birthday, AND Course Begin Date is more than 365 days prior to Date of Claim THEN Set the Event Date = Date of Claim",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.10 Determine Event Date \u2013 Note on Claim Received Date Error Handling",
      "description": "If claim received date is greater than 365 days from current date, set to manual. VBMS message: \"Review the claim received date, which is greater than 365 days.\" (This was determined as part of an issue that arose in the referenced Jira tickets.)",
      "use_case_ref": "BEPBGS-5573 BEPBGS-5357",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0139.2-a Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received no more than 365 days after 18th birthday AND There is no End Date of Last Term AND Course Begin Date is no more than 5 months after 18th Birthday AND Date of Marriage is before 18th Birthday THEN Set the Event Date = Child's 18th Birthday",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-b Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received no more than 365 days after 18th birthday, AND There is no End Date of Last Term AND Course Begin Date is more than 5 months after 18th Birthday AND Date of Marriage is before Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-c Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received no more than 365 days after End of Last Term AND Course Begin Date is no more than 5 months after End Date of Last Term AND Date of Marriage is before End of Last Term THEN Set the Event Date = End Date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-d Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received more than 365 days after End Date of Last Term AND Course Begin Date is no more than 5 months after End Date of Last Term AND Date of Marriage is before End Date of Last Term THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-e Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Course Begin Date is more than 5 months after End Date of Last Term AND Course Begin Date is no more than 365 days before or after the Date of Claim AND Date of Marriage is before Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-f Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received more than 365 days after 18th birthday, AND There is no End Date of Last Term AND Course Begin Date is no more than 365 days before or after the Date of Claim AND Date of Marriage is before Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-g Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received more than 365 days of child's 18th birthday, AND Course Begin Date is more than 365 days prior to Date of Claim AND Date of Marriage is more than 365 days prior to Date of Claim THEN Set the Event Date = Date of Claim",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.2-h Determine Event Date School Child",
      "description": "Step Child If FCDR is NOT present: IF Claim received no more than 365 days prior to Date of Marriage AND Date of Marriage is after Course Begin AND Date of Marriage is after 18th Birthday AND Current Course End Date or Graduation Date is after Date of Marriage THEN Set the Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.3-a Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.3-b Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is after FCDR AND Course Begin Date is after 18th Birthday +5 months THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.3-c Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is after FCDR AND Course Begin Date is no more than 5 months after 18th Birthday THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.3-d Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin date is no more than 5 months after End Date of Last term AND End date of Last Term is after FCDR THEN Set the Event Date = End date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.3-e Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is more than 5 months after End of Last term THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.4-a Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is before or the same as FCDR AND Date of Marriage is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.4-b Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is after FCDR AND Course Begin Date is more than 5 months after 18th Birthday AND Date of Marriage is before or the same as Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.4-c Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is after FCDR AND Course Begin Date is no more than 5 months after 18th Birthday AND Date of Marriage is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.4-d Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin date is no more than 5 months after End of Last term AND End date of Last Term is after FCDR AND Date of Marriage is before or the same as the End Date of Last Term THEN Set the Event Date = End date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.4-e Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF FCDR is the same as Rating Effective Date AND Course Begin Date is more than 5 months after the end date of Last term AND Date of Marriage is before or the same as Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.5-a Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.5-b Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is after FCDR AND There is no End Date of Last Term THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.5-c Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin date is no more than 5 months after the end date of Last term AND End date of Last Term is after or same as FCDR THEN Set the Event Date = End date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.5-d Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is more than 5 months after End Date of Last term AND Course Begin date is after FCDR THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.5-e Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is no more than 5 months after End Date of Last term AND End Date of Last Term is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.6-a Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is before or the same as FCDR AND Date of Marriage is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.6-b Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is after FCDR AND There is no End Date of Last Term AND Date of Marriage is before or the same as Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.6-c Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin date is no more than 5 months after End Date of Last term AND End Date of Last Term is after FCDR AND Date of Marriage is before or the same as End Date of Last term THEN Set the Event Date = End date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.6-d Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date is more than 5 months after End Date of Last term AND Date of Marriage is before or the same as Course Begin Date AND Course Begin Date is after FCDR THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.6-e Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is more than 365 days prior to Date of Claim: IF Course Begin Date no more than 5 months after End Date of Last term AND End of Last Term is before or the same as FCDR AND Date of Marriage is before or the same as FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.7-a Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin Date is no more than 365 days before or after the Date of Claim AND There is no End Date of Last Term THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.7-b Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin Date is more than 365 days prior to Date of Claim AND Current Course end Date or Graduation date is after FCDR THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.7-c Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin date is no more than 5 months after End Date of Last Term AND End date of Last Term is no more than 365 days before or after Date of Claim THEN Set the Event Date = End date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.7-d Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin date is no more than 5 months after End Date of Last term AND End Date of Last Term is more than 365 days prior or after Date of Claim THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.7-e Determine Event Date School Child",
      "description": "Biological Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin Date is more than 5 months after End Date of Last term AND Course Begin Date is no more than 365 days before or after the Date of Claim THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-a Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days from Date of Claim: IF Course Begin Date is no more than 365 days before or after the Date of Claim AND There is no End Date of Last Term AND Date of Marriage is before Course Begin date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-b Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days from Date of Claim: IF Course Begin Date is no more than 365 days before or after the Date of Claim AND There is no End Date of Last Term AND Date of Marriage is after Course Begin date AND Date of Marriage is before FCDR THEN Set the Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-c Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin Date is more than 365 days prior to Date of Claim AND Current Course End Date or Graduation date is after FCDR AND Date of Marriage is before FCDR AND Date of Marriage is more than 365 days prior to Date of Claim THEN Set the Event Date = FCDR",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-d Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin Date is more than 365 days prior to Date of Claim AND Current Course End Date or Graduation date is after FCDR AND Date of Marriage is before FCDR AND Date of Marriage is no more than 365 days prior to Date of Claim THEN Set the Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-e Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin date is no more than 5 months after End Date of Last term AND End date of Last Term is no more than 365 days before or after Date of Claim AND Date of Marriage is before End Date of Last Term THEN Set the Event Date = End date of Last Term",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-f Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin date is no more than 5 months after End Date of Last term AND End date of Last Term is more than 365 days prior to Date of Claim AND Date of Marriage is before Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.8-g Determine Event Date School Child",
      "description": "Step Child If FCDR is present and is within 365 days prior to Date of Claim: IF Course Begin Date is more than 5 months after End Date of Last term AND Course Begin Date is no more than 365 days before or after the Date of Claim AND Date of Marriage is before Course Begin Date THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0139.9 Determine Event Date School Child",
      "description": "Step Child IF Date of Marriage is after FCDR and Course Begin Date THEN Set the Event Date = Date of Marriage",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0145.14 Determine Event Date Minor Child to School Child",
      "description": "SECOND Event Date IF Course begin Date is before or the same as 18th birthday +5 months AND Course End Date is after 18th Birthday THEN Set the Event Date = 18th Birthday",
      "use_case_ref": "UC-06:Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0145.15 Determine Event Date Minor Child to School Child",
      "description": "SECOND Event Date If FCDR is present and is outside of 365 days from the Date of Claim: IF Course Begin date is after 18th birthday AND Course begin Date is after 18th birthday +5 months THEN Set the Event Date = Course Begin Date",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0147 Dependent With No Event Date",
      "description": "Dependent with no event date: After processing all rules without exception, if RBPS could not set event date, then send the claim for exception Exception Message: \"Auto Dependency Processing Reject Reason -RBPS could not set the event date for dependent. Please review.\"",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "offramp",
      "category": "award_calculation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0150 Validate Event Date for Previous School Child",
      "description": "If a 674 is received with previous term listed and school end dates on form are > 30 days before the Award event date on record for the school attendance terminate decision, send for exception: Exception Message: \"Auto Dependency Processing Reject Reason -School termination date discrepancy. Please review.\" If there is no school attendances terminate decision, do not send for exception. Note: Number of days may change after implementation.",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0160 Removal of spouse due to death",
      "description": "Spouse will be removed from Award as of 1st day of month following date of death: An award will be generated and authorized. The information will be sent to Awards to remove dependent. An overpayment may be created by the decision and monthly benefit will be reduced for loss of dependent. A Letter will be created by Awards.",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": "CFR 3.500 g (2) (ii)",
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0161 Removal of spouse due to divorce and no children or with Biological Child or Adopted",
      "description": "Spouse will be removed from award as of 1st day of month following date of divorce: An Award will be generated and authorized. An overpayment may be created and monthly benefit will be reduced for loss of dependent. A letter will be created.",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": "CFR 3.500 g (2) (ii)",
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0162 Removal of spouse due to divorce with Step children or undefined child type",
      "description": "Send for exception processing: Exception Message: \"Auto Dependency Processing Reject \u2013 Spouse removal not completed because child type is stepchild or unknown. Claim not eligible for automated processing.\"",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": "CFR 3.500 g (2) (ii)",
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0163 Removal of spouse before award effective date",
      "description": "Send for exception processing Exception Message\" Auto Dependency Processing Validation Reject Reason \u2013 Attempted spouse removal date is before spouses add date. Please review\"",
      "use_case_ref": "RTC-373694",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0164 Display spouse removal text in the dependency notification letter",
      "description": "If there are X number of dependents and the only dependent being removed is the spouse, insert the highlighted information for spouse removal in the \u201cWhat we decided\u201d paragraph of the Dependency notification letter as shown below: We are paying you as a Veteran with 1 dependent(s). Your payment includes an additional amount for your child Sally effective Aug 01, 2019. We made this decision because your reported dependents meet the criteria for establishing a relationship and you are in receipt of at least 30% service-connected disability benefits. (Spouse first name) has been removed from your award effective Month, Day, Year due to (reason). Let us know right away if there is any change in the status of your dependents If there are no grants and the spouse being removed is the only dependent on the award, include just the highlighted portion and the italicized portion as shown below: (Spouse first name) has been removed from your award effective Month, Day, Year due to (reason). Let us know right away if there is any change in the status of your dependents",
      "use_case_ref": "SR 1177801",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0170 Standalone 674",
      "description": "If the school child has ever been on the Award, a school child decision can be added to Award. If not, send for exception processing: Exception Message: \"Auto Dependency Processing Reject Reason \u2013Attempt to add school child that was not previously on the Award. Please develop for 686c.\"",
      "use_case_ref": "UC-10: Process Standalone 674",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0170.01 Term Date not Entered for School Child",
      "description": "Send for exception processing: Exception Message: \"Auto Dependency Processing Reject Reason - RBPS could not set the event date for school child LastName, FirstName Please review.\"",
      "use_case_ref": "RTC 297834",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0173 Rating Date Override",
      "description": "If the system identifies rating date override is used, send for exception processing: Exception Message: \"Auto Dependency Processing Reject Reason -. Rating date overridden in Awards application. Please review.\"",
      "use_case_ref": "UC-01: Retrieve/Validate Claims",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0174 Overpayments Greater than $5K",
      "description": "If dependency changes create an overpayment of $5,000.00 or more, send for exception processing. Net effect is a negative amount: Exception Message: \"Auto Dependency Processing Reject Reason -. Award will create overpayment of $5,000.00 or more. Please review.\"",
      "use_case_ref": "UC-06: Determine Award",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0175 Future Date of Birth or Marriage Date",
      "description": "If the dependent date of birth is a future date (a date past the current date), send for exception processing: Exception Message: \"Auto Dependency Processing Reject Reason -. Dependent date of birth is in the future. Please review.\" If the Veteran date of marriage is a future date (a date past the current date), send for exception processing. Exception Message: \"Auto Dependency Processing Reject Reason - Marriage date is in the future. Please review.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "offramp",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0181",
      "description": "If veteran has an active POA attorney or POA agent relationship, Then add attorney address to the CC",
      "use_case_ref": "SR1246",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "gemini",
        "copilot"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0181 POA Address CC",
      "description": "If veteran has an active POA attorney or POA agent relationship, Then add attorney address to the CC",
      "use_case_ref": "SR1246",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0182.1 POA Rules Process",
      "description": "Claims made with POA of any type are handled by the RBPS Rules Engine the same as non-POA claims.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0182.2 POA Process After Rules",
      "description": "The inclusion of POA requires that RBPS send communication packages to Package Manager to send correspondence to both the POA (agent or attorney) as well as the Veteran.",
      "use_case_ref": "BEPBGS-6236",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0182.POA Process",
      "description": "Power of Attorney (POA) process handling.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "removal_and_events",
      "source_models": [
        "gemini",
        "copilot"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0201 No Veteran Specified",
      "description": "\"Auto Dependency Processing Validation Reject Reason - A veteran must be specified.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0202 No Rating Date for Veteran",
      "description": "\"Auto Dependency Processing Validation Reject Reason -Veteran must have a Rating with a Rating Date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0203 No Rating effective date",
      "description": "\"Auto Dependency Processing Validation Reject Reason -Veteran must have a Rating with a Rating effective date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0204 Veteran with No Award",
      "description": "Veteran with No Award: If the Veteran does not have an existing award, then send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Veteran must have existing Award.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0205 Claim with Multiple 674s",
      "description": "Claim with Multiple 674s: A claim is not eligible for RBPS processing if the claim has multiple 674s per child, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claims with a Child on multiple 674s are not in scope for RBPS.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "reject",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0205.1 Claim with Two Grant Decisions",
      "description": "Claim with Two Grant Decisions: When a dependent decision \"Net Worth No Longer a Bar\" is created for an award and an auto 674 claim is made, the 674 claim is denied, send the claim for exception processing. Exception Message: \"Two grant decisions in a row Reject Reason - Error occurred that prevented Award Generation. Please review.\"",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0206 Child With No Birth Date",
      "description": "Child With No Birth Date: If a child on a claim has no Birth Date, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Child must have a Birth Date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0207 Child with No School Term",
      "description": "Child with No School Term: If a child in school has no current education term, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Child must have a current Education term.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0208 Child with No Expected Graduation Date",
      "description": "Child with No Expected Graduation Date: If a child in school has no Expected Graduation Date, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Child must have an expected Graduation Date for the current Education term.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0210 Previous Marriage Must Have Spouse",
      "description": "Previous Marriage Must Have Spouse: If the Veteran has a previous marriage with no spouse, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason -Previous Marriage must have a Spouse.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0211 Previous Marriage with No End Date",
      "description": "Previous Marriage with No End Date: If a Veteran has a previous marriage without a marriage end date, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason -Previous Marriage must have an end date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0212 Current Marriage With No Start Date",
      "description": "Current Marriage With No Start Date: If the Veteran has a Current Marriage with no Marriage Start Date, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Current Marriage must have a start date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0213 Current Marriage with End Date",
      "description": "Current Marriage with End Date: If the Veteran has a Current Marriage with an End Date, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Current Marriage must not have an end date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0214 Child with No Relationship Type",
      "description": "Child with No Relationship Type: If adding a child and the child has no Relationship Type, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Child must have a relationship type.\" If the child has ever been on the award, the relationship can be blank.",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0215 Claim in Ready Status",
      "description": "Claim in Ready Status: If a claim is not in 'Ready' status, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claim must be in 'Ready' status.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0216 Veteran Without Associated Claim",
      "description": "Veteran Without Associated Claim: If a Veteran does not have an associated claim, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason -The Veteran must have an associated Claim.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0217 Claim without EP Code",
      "description": "Claim without EP Code: If a claim does not have a valid EP Code, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claim must have an EP Code.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0218 Claim with Invalid Claim Label",
      "description": "Claim with Invalid Claim Label: If a claim has an invalid Claim Label, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claim must have a valid Claim Label.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0219 Claim with No Date",
      "description": "Claim with No Date: If a claim has no Claim Date, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claim must have a date.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0220 Claim without Associated Forms",
      "description": "Claim without Associated Forms: If a claim requires associated forms and there are no accompanying forms, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claim must have forms associated with it.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0221 No Claim ID",
      "description": "No Claim ID: If a claim has no Claim ID, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason - Claim must have an ID.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0222 No Associated Veteran",
      "description": "No Associated Veteran: If a claim does not specify a Veteran, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason -A Veteran must be specified.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0223 Veteran with No File Number",
      "description": "Veteran with No File Number: If a Veteran has no File No., send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason -Veteran must have a File Number.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0224",
      "description": "Note: CP0224 previously defined. See rule after CP0211",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "haiku",
        "gemini"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0224 Veteran with Marriage With No Spouse",
      "description": "Veteran with Marriage With No Spouse: If a Veteran has a current marriage without a spouse, send the claim for exception processing. Exception Message: \"Auto Dependency Processing Validation Reject Reason -Veteran must be Married to a person.\"",
      "use_case_ref": "UC-01 Retrieve / Validate Claims",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "data_integrity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0225 Prior School Term begins after Allowable Date",
      "description": "When a Prior School Term is submitted, and the Allowable Date (defined in CP102.4) is AFTER the submitted Prior Term begin date, set the prior term begin date to the Allowable Date and continue processing. If no Prior School Term is submitted proceed to processing for current school term.",
      "use_case_ref": "WSCR 2321 \u2013 (1.4.1)",
      "laws_regulations": null,
      "action": "process",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0225.1",
      "description": "When a prior school term is submitted, if the submitted Prior school term End Date is before the allowable date, ignore the prior school term and process through with current school term.",
      "use_case_ref": "WSCR 2321 \u2013 (1.3.2) WSCR 2321 \u2013 (1.4.1)",
      "laws_regulations": null,
      "action": "process",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0226 Set Award Event Date",
      "description": "When a prior school term is submitted: If the difference between the end date of the last term on the award (school term or child turning 18) is greater than 5 months before the prior school begin date, or if there are no school terms on the award, use the begin date of the prior school term as the Award Event Date.",
      "use_case_ref": "WSCR 2321 \u2013 (1.4.2) WSCR 2321 \u2013 (1.4.2.1) WSCR 2321 \u2013 (1.4.4.2)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0227 Set Award Event Date \u2013 continuous term",
      "description": "If the difference between the end date of the last term on the award (school term or child turning 18) is less than or equal to 5 months before the prior school begin date, consider last term on the award and submitted prior term as a continuous term. Set begin date of new (prior term) to the end date of last term so as to create continuous attendance.",
      "use_case_ref": "WSCR 2321 \u2013 (1.2.1) WSCR 2321 \u2013 (1.4.2) WSCR 2321 \u2013 (1.4.2.2)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0229",
      "description": "REMOVE EXISTING FUNCTIONALITY: If submitted school term overlaps with term on the award, the system shall no longer send the claim for Exception processing.",
      "use_case_ref": "WSCR 2321 \u2013 (1.4.3)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0235",
      "description": "When a Prior School Term exists that passes validation and there is an existing award that includes a school term, determine whether the Prior School Term Begin /End dates are covered within the current school term on the award by using the following: Calculate the proposed Prior School Term Award Effective dates. Date using Prior term, Begin and End Date. Compare the proposed dates to the Begin/End Date of the Veteran's Award (using Allowable Dates) per CP0102.4",
      "use_case_ref": "WSCR 2321 \u2013 (1.3.3)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0236",
      "description": "If the current award includes the entire prior school term, ignore the prior school term and process the claim with only the current school term. If the prior begin date is before the begin date of the school term on the award, set to Exception Processing. Exception Message: \"Begin date of prior school term is before award effective date for school attendance begins.\"",
      "use_case_ref": "WSCR 2321 \u2013 (1.3.3.3) WSCR 2321 \u2013 (1.3.3.1)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0237",
      "description": "For both the prior term and the current term, determine whether the term can be considered as continuous school attendance. a. Calculate the Award Effective Dates for each submitted term, using the Event date determined earlier. b. If there is less than or equal to a 5-month gap between most recent Corporate Term Award Effective Dates and Current Term Award Effective Date, process using continuous school attendance from end of Corporate Term. c. If there is less than or equal to a 5-month gap between Prior Term Award Effective Dates and Current Term Award Effective Date, process using continuous school attendance from end of Prior Term. d. When a prior term and a current term is submitted, if the prior term Award Effective Dates are fully included within the current term Effective Dates and the prior term is not continuous with the current term, send the claim to Exception Processing: Exception Message: \"Auto Processing Dependency Processing Reject - Prior school term submitted is shorter than on the award and would result in school attendance not being continuous. Please Review.\" When criteria for continuous attendance is met, set begin date of new term to the end date of last term so as to create continuous attendance. If the difference is greater than 5 months, and the prior school term is to be used, create the prior school term and the current school term as separate terms. Note: The same rules apply for Minor to School Child.",
      "use_case_ref": "CCR2694 WSCR 2321 \u2013 (1.5) and (1.5.1 and (1.5.2) WSCR 2321 \u2013 (1.3.3.2.1), (1.4.4) and (1.4.4.1) WSCR 2321 \u2013 (1.3.3.2.2) WSCR 2321 \u2013 (1.5)",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "school_term_validation",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0238",
      "description": "In reference to the Veteran sensitivity levels, RBPS should process veterans with sensitivity levels 0 through 7. Processing of veterans with sensitivity levels 8 and 9 should go to manual status so that they can be reviewed by a VSR.",
      "use_case_ref": "RTC 801839",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "sensitivity",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0239 \u2013 Appeals Modernization Act (AMA)",
      "description": "1) Replace the appeals paragraph and replace the 4107 for all decisions with the 0998. 2) Add the favorable findings and elements not met for denials",
      "use_case_ref": "SR 882203",
      "laws_regulations": "N/A",
      "action": "evaluate",
      "category": "appeals",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0240",
      "description": "This rule is run at the end of Rules processing to ensure that the event date is not set before the veteran's first 30% date. Note: this rule applies to Child only. IF - The event date of 'the Award' is before the first 30% date of the 'the Veteran' (rating effective date). THEN - set the event date of 'the Award' to the first 30% date of the 'the Veteran' (rating effective date).",
      "use_case_ref": "SR 1210720 SR 1205511",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0251",
      "description": "If \"Failed to Confirm\" or \"Elected Chapter 35 Benefits\" award Dependency decisions exist for any dependents, Then Set to manual with the following message",
      "use_case_ref": "SR473, 677, 941 1301",
      "laws_regulations": null,
      "action": "offramp",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku",
        "gemini",
        "copilot"
      ],
      "model_count": 4
    },
    {
      "rule_id": "CP0252 \u2013 RBPS Dashboard",
      "description": "The RBPS Dashboard was added as a functional component to the RBPS architecture. The dashboard allows authorized users to control and monitor RBPS in real time, with functions like ON/OFF and letter regeneration, and views including information such as letters processed on a given date and thread monitoring. A full list of RBPS Dashboard requirements can be seen in Appendix C of this document.",
      "use_case_ref": null,
      "laws_regulations": null,
      "action": "evaluate",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0253a \u2013 Award Adjustment Response: Separation Pay",
      "description": "Adding a child or spouse to a case with separation pay adjustment will go to complete.",
      "use_case_ref": "BEPBGS-4878",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0253b \u2013 Award Adjustment Response: Disability Severance Pay",
      "description": "Adding a child or spouse to a case with disability severance pay will go to complete.",
      "use_case_ref": "BEPBGS-4878",
      "laws_regulations": null,
      "action": "evaluate",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0253c \u2013 Award Adjustment Response: Pending Apportionment Decision",
      "description": "Adding a child or spouse to a case that has an adjustment for \"pending apportionment decision\" will go to manual. Note: Award adjustment found, please review",
      "use_case_ref": "BEPBGS-4878",
      "laws_regulations": null,
      "action": "offramp",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0253d \u2013 Award Adjustment Response: Pending Appointment of Fiduciary",
      "description": "Adding a child or spouse to a case that has an adjustment for \"pending appointment of fiduciary\" will go to manual. Note: Award adjustment found, please review",
      "use_case_ref": "BEPBGS-4878",
      "laws_regulations": null,
      "action": "offramp",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    },
    {
      "rule_id": "CP0253e \u2013 Award Adjustment Response: Other Withholding",
      "description": "Adding a child to a case that has an adjustment for \"other withholding\" will go to manual. Note: Award adjustment found, please review",
      "use_case_ref": "BEPBGS-4878",
      "laws_regulations": null,
      "action": "offramp",
      "category": "post_processing",
      "source_models": [
        "opus",
        "haiku"
      ],
      "model_count": 2
    }
];

export const getAllRules = (): Rule[] => Object.values(mockRules);
