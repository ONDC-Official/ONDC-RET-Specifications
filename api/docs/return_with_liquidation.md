### <ins>Return With Liquidation</ins>
* Return of items can only be initiated when fulfillment state (for item) is "Order-delivered";
* Return of an item can only be initiated within the return window for the item (as defined in the catalog);
* Return with liquidation can transition through either of the following state changes:
    * Scenario A - Return liquidated:
        * Return_Initiated -> Return_Liquidated
    * Scenario B - Return rejected:
        * Return_Initiated -> Return_Rejected

Please refer to update/on_update example for [this](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-1.x/api/components/Examples/B2C/update/update_buyer_initiated_return_with_liquidation.yaml)
