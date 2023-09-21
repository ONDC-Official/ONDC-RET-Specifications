### <ins>Return With Reverse QC</ins>
* Return of items can only be initiated when fulfillment state is "Order-delivered";
* Return of an item can only be initiated within the return window for the item (as defined in the catalog);
* Return with reverse QC can transition through either of the following state changes:
    * Scenario A - Return approved, Return pick successful:
        * Return_Initiated -> Return_Approved -> Return_Picked (refund triggered here) -> Return_Delivered
        * Return_Initiated -> Return_Approved -> Return_Pick_Failed -> Return_Picked (refund triggered here) -> Return_Delivered
    * Scenario B - Return approved, Return failed:
        * Return_Initiated -> Return_Approved -> Return_Pick_Failed -> Return_Failed
    * Scenario C - Return rejected:
        * Return_Initiated -> Return_Rejected
* It is assumed that the LSP assigned for return pickup will have a certain no of pickup attempts and will trigger scenario B after all pickup attempts failed;


Please refer to update/on_update example for [this](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-1.x/api/components/Examples/B2C/update/update_buyer_initiated_return_with_reverse_qc_request.yaml)