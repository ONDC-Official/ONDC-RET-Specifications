# BRD for Payment Flow
This document only describes the payment and settlement flow of B2C exports.

## Prerequisite:


1.	Seller is an exporter.
2.	Seller has an IEC number.
3.	Payment is collected by OPGSP entity.
4.	Seller App is a business partner with OPGSP entity and seller is availing services of OPGSP for payment collections for the cross border trade..
5.	OPGSP entity does KYC of each seller and on- boards it compliant to the guidelines of OPGSP. Seller App must ensure each of the seller is onboarded.
6.	Seller App ensure it maintains a register of permissible goods and destination countries and allow only those that are permissible.
7.	Currency to be delt – USD / Euro / SDG/ CAD/AUD/GBP or permissible FIAT currencies.
8.	Seller App is necessarily in India and Seller is in India.
9.  Seller to maintain the product catalog in INR and currency conversion can be done by the buyer app alternatively seller can maintain catalog in multiple currencies
9.	Destination of shipment / consignment is a foreign jurisdiction.

**Scenarios** – Based on the jurisdiction Buyer App is located, there can be 2 scenarios.
1.	Buyer App in India – The commission to be paid in INR.
2.	Buyer App overseas – The commission to be paid in pre-determined FIAT currencies.

## Transaction Flow

### Buyer App in India  
On selection of goods the customer is show total Price in the foreign currency .

This price will be including:
- Price of Goods/ Service including Logistics 
-  	Seller App’s Commission
-  	Buyer App’s Commission
    1. On selection of goods, payment link Provided by Seller App (of the exporter/seller) via OPGSP player and is rendered to the buyer app.
    2.	Total value paid is commissions + price of goods.
    3.	Buyer uses his credit card or any other permissible ‘form factor ‘and pays on the OPGSP in foreign currency.
    4.	Monies are debited from the customer’s account (which is in foreign jurisdiction) and credited to OPGSP’s Banking partner Nostro Account in the respective country.
    5.	On credit in Nostro account, the monies are instantaneously credited into the OPGSP collection account.
    6. Seller App reconciliation framework, provides the following details to OPGSP -
        - Sellers Account details and Price of Goods/ Service.  (The seller account details should already be with OPGSP, but this can be an additional check)
        - Seller App Account and Commission for both Buyer App and Seller App. (The seller account details should already be with OPGSP, but this can be an additional check)
    7. During EOD settlement - Monies are then credited in following three accounts.
        - Sellers Account - Price of Goods/ Service including Logistics. 
        - Seller App Account - Seller App Commission + Buyer App Commission
    8. EOD, framework of the buyer app generates a demand for commission (at an aggregate level) and shares it with SA and Sellers App NP account is debited and buyers app NP account credited using the Reconciliation and Settlement framework

The buyer app and seller app commissions will be provided for the quote will include taxes and the GST will be paid by the Buyer App and Seller App respectively. Please note export does not have GST so seller’s good need not have GST component.

### Buyer App Overseas
1.	On selection of goods, payment link Provided by Seller App (of the exporter/seller) via OPGSP player and is rendered to the buyer app.
2.	Total value paid is commissions + price of goods.
3.	Buyer uses his credit card or any other permissible ‘form factor ‘and pays on the OPGSP in foreign currency.
4.	Monies are debited from the customer’s account (which is in foreign jurisdiction) and credited to OPGSP’s Banking partner Nostro Account.
5.	On credit in Nostro account, the monies are instantaneously credited into the OPGSP collection account.
6.	Seller App reconciliation framework, provides the following details to OPGSP –
    1. Sellers Account details and Price of Goods/ Service.  (The seller account details should already be with OPGSP, but this can be an additional check)
    2. Seller App Account and Commission for both Buyer App and Seller App. (The seller account details should already be with OPGSP, but this can be an additional check)
7. During EOD settlement - Monies are then credited in following three accounts.
    - Sellers Account - Price of Goods/ Service including Logistics. 
    - Seller App Account - Seller Commission plus Buyers Commission.
8. Once a Month, at a predetermined date the reconciliation framework of the buyer app generates a demand for commission (at an aggregate level) and shares it with  Seller.and the SA also thru RSP
9. Through the SA instruction, NP account of the seller App is debited, and buyer app’s foreign account is credited using the same OPGSP entity < Provide link to the document>.
10. This transaction is technically a separate transaction for import of services from the buyer app. 
 
## Refund scenario -

1. Refund is a separate transaction .
2. Through reconciliation framework , buyer app refunds money to seller app. Seller App and seller returns money thru OPGSP account back to buyer .
3. In case the buyer app is overseas , then buyer will get two refund - 
    - a. Buyer app will refund his fee locally 
    - b.  Seller app fee and charges of good will be returned by the OPGSP to the source account.
4. Money will always be credited to source account.
