</br>

## Serviceability Construct (Specific to Exports)

The serviceability construct for seller to be able to export the items to a different country is defined based on below parameters:

- IEC
- AD Code
- Is the item exportable to the destination country
- Does the seller require any special **license/certificates** to export the item?

Certificates required to ship particular items can be checked from the Compliance Information Portal [here](https://cip.icegate.gov.in/CIP/#/home) based on the HS code of the item.

The serviceability construct for buyer to be able to import the items is defined based on below parameters:

- License/Certificate to import the item.
</br>

## B2B Buying Flow

This section elaborates the process flow for buying bulk items on the network. The buying process majorly happens in four phases of Discovery of item, Request for Quotation and Purchase Order, Order fulfillment and Post fulfillment.

</br>

## Discovery

The process begins with the B2B buyer initiating a search request for an item. The buyer app relays the search request to a Gateway. The gateway performs a look-up on the ONDC Registry to identify the seller apps registered in the Exports domain and in the country of origin and then multi-casts the search query to all such seller apps.

Multiple seller apps, in turn, respond with an on_search call, with the product catalog, based on the serviceability construct defined above. Apart from the catalog, the seller app also shares a communication channel, where buyer and seller can communicate for further clarifications. The catalog is thus displayed to the buyer.

The diagram below illustrates the flow of discovery phase interactions:

<div style="display: flex; justify-content: center;">
<img src="https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-2.x/api/images/B2B-Discovery.png?raw=true" alt="Alt Text" width="700" height="500" >
</div>

</br>

## RFQ and PO

From multiple on_search responses received, the buyer selects an item (variants, add_ons and offers as required). Post selection of an item, buyer requests for quotation for the selected item with all the customizations and the quantity of items required. Once the buyer provides these customization details, the buyer app relays this information to the seller app. Select will also include the TTL, time till which buyer wants to wait for response to RFQ.

In order to provide the quotation with logistics charges, either the exporter looks for on-network or off-network logistics and appends the logistics charges to the quotation and then responds to the buyer app with the quotation. Seller updates the final quotation and breakup in on_select call. The TTL for getting the response on RFQ will be based on the TTL defined by the buyer in the select call. Buyer receives the quotation and once agreed to go ahead with the quotation received, initializes the order and provides billing details via init call. And then creates a PO and sends the PO. Buyer app relays the PO to the seller app through confirm call. Once the PO is received, the seller accepts the PO. Seller app sends an on_confirm call to the buyer app relaying the PO acceptance.

Buyer sending Request for Quotation includes:

- Unit of measure
- Quantity
- Incoterms
- Payment options

Seller sending Quotation response includes:

- Item Discounts
- Order level Discounts
- Payment options
- Logistics charges

<div style="display: flex; justify-content: center;">
<img src="https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-2.x/api/images/B2B-Order_phase.png?raw=true" alt="Alt Text" width="900" height="500" >
</div>

</br>

## Order Fulfillment

Once the PO is accepted, the buyer makes the payment (in case of prepaid). If the payment is collected by BAP, the Buyer app sends the payment confirmation to the seller app through an update call. In case the payment is collected by BPP, Seller app sends the payment confirmation to buyer app through /on_update.

<div style="display: flex; justify-content: center;">
<img src="https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-2.x/api/images/B2B-Fulfillment_phase.png?raw=true" alt="Alt Text" width="700" height="500" >
</div>

</br>

## Post Fulfillment

The buyer can request for order status, which is relayed by the buyer app through status call to the seller app and seller responds to the status call with Order status or tracking link in order to track the shipment while in transit to the destination country.

Unsolicited on_status calls can also be triggered by the seller app to share the status of the shipment.

</br>

## Sequence Diagrams:

### Version 2.0.2:

<div style="display: flex; justify-content: center;">
<img src="https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-2.x/api/images/B2B-2-0-2.png?raw=true" alt="Alt Text" width="950" height="1050" >
</div>

</br>

## API Specs:

Please refer to swagger and [GIT](https://ondc-official.github.io/ONDC-RET-Specifications/#) to refer to the complete API specs.

**Additions in Current B2B specs:**

### Addition of Communication Channel:

**/on_search:**

- Communication Channel
- Item add_ons
- Item variants
- Price slabs
- Offers
- Creds

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/on_search/on_search.json)

### Request for Quotation:

Adding free text in RFQ for order customization + delivery incoterms to be sent by Buyer while requesting for quotation:

- **TTL** added by buyer till when buyer will wait for RFQ
- **Creds** to pass the buyer import license for the item.
- **Buyer Terms** to send customizations required for Item and packaging.
- **Delivery Terms** (Incoterms specific to Exports)

Enums for INCOTERMS:

- CIF (Cost, Insurance and Freight)
- EXW (Ex works)
- FOB
- DAP
- DDP

**/select:**

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/select/select_domestic.yaml)

### Response for Quotation:

Breakup and Quote to be sent as part of response to quotation as part of /on_select and /on_init. No changes in API specs.

While /select is used for RFQ and response for Quotation is sent through /on_select, delivery changes would need to be sent as part of /on_select.


Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/on_select/on_select_domestic.yaml) 

### Purchase Order:

**/confirm:**

Purchase Order needs to be created as part of /confirm.

Payment status will be Not-Paid as payment is made post PO acceptance.

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/confirm/confirm_domestic.yaml) 

**/on_confirm:**

Purchase Order Acceptance in /on_confirm:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/on_confirm/on_confirm_domestic.yaml)

**/confirm:**
Payment is made as part of PO/confirm:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/confirm/confirm_domestic.yaml) 

### Payment Status (post offline payment):

**/update:**

Payment received by BAP/BPP post PO confirmation:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/update/update_prepaid.yaml)


**/on_update:**

Payment received by BPP:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/on_update/on_update_prepaid.yaml)

### Multiple Fulfillments w.r.t. Single PO:

**/on_update:**

After PO acceptance, the Seller updates the fulfillment to send the order in multiple fulfillments. For example, out of 200 Item counts, 100 are sent as part of first fulfillment and the rest 100 are sent as part of second fulfillment.

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/release-2.0.2/api/components/Examples/B2B/on_update/on_update_fulfillments.yaml)