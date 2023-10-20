### <ins>Part Cancel By Merchant</ins>
* Cancel of item(s) can only be initiated if fulfillment state is "Pending";
*A separate fulfillment is created for the cancellation and the item & quantity assigned to it. This fulfillment also has associated details such as cancellation reason code, quote trail;
* Updated quote is provided by the seller NP at the refund trigger point ("Liquidated", "Return_Picked", "Cancelled") and the buyer NP can calculate the amount of refund from the quote trail;

Please refer to update/on_update example for [this](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-1.x/api/components/Examples/B2C Exports/on_update/on_update_merchant_cancels_customized.yaml)