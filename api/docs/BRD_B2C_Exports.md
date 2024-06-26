# B2C Exports 
Version 2

01/08/2023

## Overall Construct

| Entity | Additional Capabilities Required to enable B2C Export | Documents/ Data |
|-- |-- |-- |
| Buyer | |
| Buyer App | Enable choice of an international address for shipping/ delivery. <br/>The BA will need to validate the entered zip/pin code formats  for the respective countries | NA |
| Gateway | Broadcast the “/search” to relevant seller apps that qualify for B2C export to the destination country per ONDC’s registry. | As per serviceability construct  |
| Seller App | Seller on record is eligible to export that specific product to that specific country. This is to be built as part of the Serviceability construct. | Following to be verified for the seller on record (Not exhaustive):<br/>- IEC Code <br/>- AD Code <br/>- PAN <br/>- GSTIN <br/>- Certificate/ License to export the product to the destination country <br/>- Others |
| Logistics Seller | Verify that the seller on record is eligible to export to that specific product to that specific country: Built into the serviceability construct | - Certificate/ License to export the product to the destination country |


## Basic Flow
The buyer will follow the following steps to purchase an export item:
1. An overseas buyer logs in to one of ONDC’s buyer apps 
2. The overseas buyer searches for a product to be purchased from India on  Buyer App
3. Gateway broadcasts the buyer app’s“search” packet to  relevant seller apps that qualify for “B2C export to the destination country” per serviceability construct
4. In response to the buyer app’s “search” packet, Seller Apps (in India) share item(s)’ price(s), catalog(s) (matching the search query) with the buyer app via “on_search” packet(s) 
5. The buyer app displays product’s information on its Category Landing Page (CLP) and Product Display Page (PDP) respectively. Price is displayed in any one of the globally accepted currencies  defined by Buyer app
6. The overseas buyer selects the product they want to purchase 
7. Seller apps (in India) share the Order Value and other relevant details, with the buyer app 
8. Buyer enters the shipping / delivery address (with location and pincode) on the buyer app
9. Once the buyer provides the shipping address (of destination country)*, the buyer app requests the seller app to send details such as payment link and T&C
10. The seller app  shares payment details & terms, invoice, payment value, & terms 
11. Buyer app displays the payment details of either the seller on record
12. Buyer makes the payment in foreign currency 
13. Payment is made to seller on record not to Seller or Buyer App
14. The seller app shares payment acknowledgement with the buyer app

Payment Flow : Link [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-b2c_exports/api/docs/%23opgsp%23_payment_flow.md)

15. Buyer sees order confirmation on the buyer app
Order fulfillment is initiated

## Appendix
### Search Mechanism

- Buyer should be able to search for products of his/her choice  on the buyer app
- On completion of search, the buyer should be able to see the products (that qualify for export)  by different sellers.
- Buyer app should disclose the key parameters basis which search results (list & order of products) are published for the buyer 
- Buyer app should send the buyer finder fee, either as % charge or fixed charge, to the seller app. Payment settlement and flow of this to be covered in payment doc here.

### Serviceability Check
- Buyer App allows the buyer to choose an international address as shipping/ delivery address
- Seller Apps should return search results from those sellers only who are eligible to export product(s) to that international address
- While placing the order, the buyer’s current location might be different from the international address chosen for shipping/delivery, and hence, the serviceability check applies on the shipping/ delivery address and not on the buyer’s current location, unless they are the same

### Buyer Information/ Data Collection
- Buyer App will collect the shipping/ delivery address from the buyer which will be an international address. From a Tech standpoint, the international address shall be composed of the following:
    - GPS Location
    - Area/ Zip/ Pin Code
    - Country & its equivalent code, if any, being maintained at the backend

#### PAYMENT COLLECTION
Payment flow doc available [here](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-b2c_exports/api/docs/%23opgsp%23_payment_flow.md)

#### ORDER FULFILLMENT 

- Seller App to provide minimum of following order updates and buyer app to display the same as well (a) ready to ship (b) shipped (c) delivered (d) cancellation related status updates 
    - (Status Communications from Logistics Seller to Seller app and Seller App to Buyer app:
        - Pickup approved/ rejected
    - Order confirmed (paid for)
        - Order Picked up
        - In Transit
        - Reached Warehouse
        - Custom Cleared/ Rejected Domestic, i.e., Order approved/ rejected by export customs
        - Shipped
        - Reached Destination Country
        - Custom Cleared/ Rejected Destination Country
        - Out for Delivery
        - Delivered

#### ADDITIONAL FEATURES 

- Return & Cancellation 
    - Cancellation
        - Pre-dispatch Cancellation: Buyer or Seller may cancel the order before dispatch of the product
- Refund
    - Only for the cancellation scenario mentioned above: will be covered in Payment Flow linked here.

- Support
    - Buyer app and seller app (Marketplace Seller NPs) are expected to also build build IGM as per API contracts