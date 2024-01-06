# Prepaid payment collected by BPP - Non RFQ flow
In order to strengthen the unbundled ecommerce transactions and enable trust on the network, there is a need to enable payments collected by seller app and exchange and agree the terms of trade between buyer and seller app (BPP).

## _/on_search_

As part of the catalog, BPP informs BAP on payment terms (collected by BPP). Here two cases arise which relate to payment collection:

1. **BPP level** - The payment is collected by the seller app for all the providers, or for Inventory Seller Node(ISN) seller apps.

2. **Provider level** - The payment is collected by the seller app for some selected providers.

### 1. BPP Level

In this case, the message catalog of on_search contains the payments array is associated with the whole catalog inside the message body.

```
"message": {
  "catalog": {
    "payments": [
                  {
                    "id": "1",
                    "type": "PRE-FULFILLMENT",
                    "collected_by": "BPP"
                  },
                  {
                    "id": "2",
                    "type": "ON-FULFILLMENT",
                    "collected_by": "BPP"
                  },
                  {
                    "id": "3",
                    "type": "POST-FULFILLMENT",
                    "collected_by": "BPP"
                  }
                  ],
            }
          }
```

### 2. Provider Level

In this case, the `payments` array contains the particular provider(s) who choose(s) to collect the payment through the seller app.

```
"message": {
  "catalog": {
    "providers": [
      {
        "id": "P1",
        "payments": [
          {
            "id": "1",
            "type": "PRE-FULFILLMENT",
            "collected_by": "BPP"
          },
          {
            "id": "2",
            "type": "ON-FULFILLMENT",
            "collected_by": "BPP"
          },
          {
            "id": "3",
            "type": "POST-FULFILLMENT",
            "collected_by": "BPP"
          }
        ]
      }
    ]
  }
}
```
> Between the _/select_ and _/on\_select_ calls, the BAP and BPP negotiate the prices

## _/on_init_
BPP sends the payment gateway link. This payment gateway link has to be signed by BPP using its private key. Base64 string of the same to be sent as part of the signature. The signature algorithm used (**ED25519**) is also sent as a part of the payload.

The payload sent by the seller also contains the TTL for expiration of the transaction. This is to set the transaction expiration on the Payment Gateway. If the payment is still in the pending state when TTL has expired, the payment gateway cancels the transaction and initiates refund for the buyer if amount is debited. 

```
"payments": [
    {
      "type": "PRE-FULFILLMENT",
      "collected_by": "BPP",
      "uri": "https://snp.com/pg",
      "@ondc/org/buyer_app_finder_fee_type": "percent",
      "@ondc/org/buyer_app_finder_fee_amount": "0",
      "@ondc/org/settlement_basis": "delivery",
      "@ondc/org/settlement_window": "P1D",
      "@ondc/org/withholding_amount": "10.00",
      "@ondc/org/settlement_details": [
        {
          "settlement_counterparty": "buyer-app",
          "settlement_phase": "sale-amount",
          "settlement_type": "upi",
          "beneficiary_name": "xxxxx",
          "upi_address": "gft@oksbi",
          "settlement_bank_account_no": "XXXXXXXXXX",
          "settlement_ifsc_code": "XXXXXXXXX",
          "bank_name": "xxxx",
          "branch_name": "xxxx"
        }
      ],
      "tags": [
        {
          "descriptor": {
            "code": "BPP_payment"
          },
          "list": [
            {
              "descriptor": {
                "code": "signature"
              },
              "value": "xxxxxxxxxxxxxx"
            },
            {
              "descriptor": {
                "code": "dsa"
              },
              "value": "ED25519"
            },
            {
              "descriptor": {
                "code": "ttl"
              },
              "value": "PT30M"
            }
          ]
        }
      ]
    }
  ]
```

## _/status_
The seller can send a _status_ request to know the state of the payment transaction. The BPP returns this request with _on\_status_. This call is optional.

## _/on_status_
This is an unsolicited call which returns with the status of the payment. The returned status can be either of the three :

- Paid - Received when payment is confirmed.
- Unpaid - When payment is not received.
- Pending - In a state of flux.

### Payment Success:
Once the _on\_status_ is sent as paid to the BAP. The buyer app sends a _confirm_ object. This confirms the whole payment procedure. The seller responds with an _/on\_confirm_ acknowledgemet.

> The Transaction is wrapped up in the successive _/confirm_ and _/on\_confirm calls.

### Payment failed:
If the payment fails, the _on\_status_ returns status: "Payment Failed" in the error object inside the message body.
```
"error": {
  "code": "31004",
  "message": "Payment Failed"
}
```
It should also be noted that status will be unpaid if payment fails.

## What happens when TTL expires ?

When the TTL mentioned by the seller expires with either no response or pending status, the buyer sends `NACK` if payment TTL expired and seller sends _on\_status_ message "Payment TTL Expired" as shown below.
```
"error": {
  "code": "31004",
  "message": "Payment TTL Expired"
}
```

If buyer app has already sent `NACK` after TTL expiration but payment has succeeded then the buyer uses _cancel_ and _on\_cancel_ (seller-side) for refund of the debited amount.


<img src="https://github.com/abhik-wil/ONDC-RET-Specifications/blob/release-2.0.2/api/images/prepaid_payment_non_rfq_flow.png?raw=true" alt="Sequence Diagram" width="900" >
</div>
