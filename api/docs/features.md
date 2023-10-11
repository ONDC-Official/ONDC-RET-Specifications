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

This section elaborates the process flow for Exporting bulk items on the network. The buying process majorly happens in four phases of Discovery of item, Request for Quotation and Purchase Order, Order fulfillment and Post fulfillment.


<div style="display: flex; justify-content: center;">
<img src="https://lh6.googleusercontent.com/b5c7wOkKU8rUgT0XQv02An9pLuwheaKvAh0gM-dIXWux919femKXVnuCWnuROnJOwGimGhuEwv0dXkos1ADhAxD-cFWF8up7q6mD-EfeM8A2ohUJRMLbdhHL1SF1qKnQdVKMs0KR0-CZBi_H5ykHapU" alt="Alt Text" width="700" height="500" >
</div>

</br>

## Discovery

The process begins with the B2B buyer initiating a search request for an item. The buyer app relays the search request to a Gateway. The gateway performs a look-up on the ONDC Registry to identify the seller apps registered in the Exports domain and in the country of origin and then multi-casts the search query to all such seller apps.

Multiple seller apps, in turn, respond with an on_search call to the gateway, with the product catalog, based on the serviceability construct defined above. Apart from the catalog, the seller app also shares a communication channel, where buyer and seller can communicate for further clarifications. The gateway relays these responses to the buyer app, which displays them to the buyer.

The diagram below illustrates the flow of discovery phase interactions:

<div style="display: flex; justify-content: center;">
<img src="https://lh4.googleusercontent.com/4GdWipRPwFYxcdqMmzaarSb6020ES6Icbaw7cZhQvY3MUo3eGYDIMXm--pg_UB7C5gavmaTggCndD0ft-GPfvvPqU038MMpCcGqeP9V7L5igNVuyCEiT93GES8MLxbDzQTiY-CpEgkqxZVK0NkZEkZI" alt="Alt Text" width="700" height="500" >
</div>

</br>

## RFQ and PO

From multiple on_search responses received, the buyer selects an item (variants, add-ons and offers as required). Post selection of an item, buyer requests for quotation for the selected item with all the customizations and the quantity of items required. Once the buyer provides these customization details, the buyer app relays this information to the seller app. Select will also include the TTL, time till which buyer wants to wait for response to RFQ.

In order to provide the quotation with logistics charges, either the exporter looks for on-network or off-network logistics and appends the logistics charges to the quotation and then responds to the buyer app with the quotation. Seller updates the final quotation and breakup in on_init call. The TTL for getting the response on RFQ will be based on the TTL defined by the buyer in the init call. Buyer receives the quotation and once agreed to go ahead with the quotation received, creates a PO and sends the PO. Buyer app relays the PO to the seller app through confirm call. Once the PO is received, the seller accepts the PO. Seller app sends an on_confirm call to the buyer app relaying the PO acceptance.

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
<img src="https://lh3.googleusercontent.com/P2bSYiM3gfq7sSWxwX7Jd6ebCxYI_j4M7xEzhOLq6F9E6OgACzr4gM_PPEdywfCSgXLXbo-IpQfMzd6SHQFZvo8Fe2B4JY3v5uKqZxdOLiRQAXPhK8KrWykGwxkUgL0aAqN_RDie127gjIl1DOT8meU" alt="Alt Text" width="700" height="500" >
</div>

</br>

## Order Fulfillment

Once the PO is accepted, the buyer makes the payment (in case of prepaid). If the payment is collected by BAP, the Buyer app sends the payment confirmation to the seller app through an update call. In case the payment is collected by BPP, Seller app sends the payment confirmation to buyer app through /on_update.

<div style="display: flex; justify-content: center;">
<img src="https://lh5.googleusercontent.com/a6J-E-t3j7kfgjYyEmlZwLO7kkf1IT7XWlzisyIeGB14CfxJCIO3i25qPQytlXMOC1jQFmPcYy_P8ljdYHyQ2iJwW4NHSkl98IcKQS-qb5K1_zF0ZDRAJoKUx7Qdq-uMSlbqQHKeFMAFXFBLDxsLa0o" alt="Alt Text" width="700" height="500" >
</div>

</br>

## Post Fulfillment

The buyer can request for order status, which is relayed by the buyer app through status call to the seller app and seller responds to the status call with Order status or tracking link in order to track the shipment while in transit to the destination country.

Unsolicited on_status calls can also be triggered by the seller app to share the status of the shipment.

<div style="display: flex; justify-content: center;">
<img src="https://lh5.googleusercontent.com/nJivsbjPZMoicQ6AuUljdUOghqtpTfLR5LUyFO0DELD0dC76Bl_4gCsHNuSiNK4gvuCu6eTWoHISjzhxf7IBPnf5do7Is_EZaG9x4R67hHa5ky5A0NESMiGBpqZiHvRXay53cMc2tEOY13ikY2XevFI" alt="Alt Text" width="500" height="300" >
</div>

</br>

## Sequence Diagrams:

### Version 2.0.1:

<div style="display: flex; justify-content: center;">
<img src="https://lh4.googleusercontent.com/kJMDumHQOyvWjhofz6leKAhBwio0fRlX5-__zGqbn1zoJFen5BWgBzi0t0df20llk86UtOOdaU5XsLVEB9YOqrWUqEg9eMfgtjckxferyBfGjEisjJR1smOzRfTo-wDTeRn83_ftTeLEDEy5ESFVnzY" alt="Alt Text" width="750" height="900" >
</div>

</br>

## Use Cases

### 1. Happy Flow:

| Task                                                                                              | API         |
| ------------------------------------------------------------------------------------------------- | ----------- |
| Buyer outside India searches for a product                                                        | /search     |
| Seller responds with catalog + communication channel                                              | /on_search  |
| Buyer selects an item (Variants/add-ons/offers as required) + Item customization + Delivery terms | /select     |
| Seller responds with quote breakup                                                                | /on_select  |
| Buyer Requests for Quotation                                                                      | /init       |
| Seller responds with Quotation                                                                    | /on_init    |
| Buyer creates a Purchase Order                                                                    | /confirm    |
| Seller accepts Purchase Order                                                                     | /on_confirm |
| Payment status is sent (If collected by BAP) + requests for Invoice                               | /update     |
| Payment status is sent (If collected by BPP)                                                      | /on_update  |
| Buyer requests for Shipment status                                                                | /status     |
| Seller responds with Shipment status + Sends the invoice                                          | /on_status  |

</br>

### 2. Seller updates the Item quantity post PO acceptance:

|                                                     |                          |
| --------------------------------------------------- | ------------------------ |
| **Task**                                            | **API**                  |
| Seller updates the Item quantity post PO acceptance | /on_update (unsolicited) |

</br>

## API Specs:

Please refer to swagger and [GIT](https://github.com/tanya-ondc/B2B-1.5) to refer to the complete API specs.

**Additions in Current B2B specs:**

### Addition of Communication Channel:

**/on_search:**

- Communication Channel
- Item add-ons
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

Enums for DELIVERY_DUTY:

- DDP (Delivered Duty Paid)
- DDU (Delivered Duty Unpaid)

**/select:**

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/select/select_domestic.json)

**/init:**

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/init/init_domestic.json) 

### Response for Quotation:

Breakup and Quote to be sent as part of response to quotation as part of /on_select and /on_init. No changes in API specs.

While /init is used for RFQ and response for Quotation is sent through /on_init, delivery changes would need to be sent as part of /on_init and would be optional in /on_select.


Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/on_init/on_init_domestic.json) 

### Purchase Order:

**/confirm:**

Purchase Order needs to be created as part of /confirm.

Payment status will be Not-Paid as payment is made post PO acceptance.

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/confirm/confirm_domestic.json) 

**/on_confirm:**

Purchase Order Acceptance in /on_confirm:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/on_confirm/on_confirm_domestic.json)

**/confirm:**
Payment is made as part of PO/confirm:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/confirm/confirm_domestic.json) 

### Payment Status (post offline payment):

**/update:**

Payment received by BAP:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/update/update_prepaid.json)


**/on_update:**

Payment received by BPP:

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/on_update/on_update_prepaid.json)

### Multiple Fulfillments w.r.t. Single PO:

**/on_update:**

After PO acceptance, the Seller updates the fulfillment to send the order in multiple fulfillments. For example, out of 200 Item counts, 100 are sent as part of first fulfillment and the rest 100 are sent as part of second fulfillment.

Refer to the example [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/master/api/components/Examples/B2B_json/on_update/on_update_fulfilments.json)
