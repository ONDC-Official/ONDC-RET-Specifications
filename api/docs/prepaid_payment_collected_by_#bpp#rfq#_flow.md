# Prepaid payment collected by BPP - RFQ flow

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

In this case, if payment needs to be collected by BPP only for specific providers, then providers.payments specifies payment collected by BPP. Refer below:

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

> Between the _/select_ and _/on\_select_ calls, the BAP and BPP negotiate the prices.
>
> In /init and /on_init, the quotation is accepted by the buyer and buyer initialises the order.
>
> Buyer raises a PO (Purchase Order) in /confirm nd seller accepts the PO as a part of /on_confirm.

## _/on_confirm_

While accepting the PO, seller sends the payment gateway link. This payment gateway link has to be signed by BPP using its private key. Base64 string of the same to be sent as part of the signature. The signature algorithm used (**ED25519**) is also sent as a part of the payload.

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
          "settlement_phase": "finder-fee",
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

The BAP can send a _status_ request to know the state of the payment transaction. The BPP returns this request with _on\_status_. This call is optional.

## _/on_status_

This is an unsolicited call which returns with the status of the payment. The returned status can be either of the three :

- PAID - Received when payment is confirmed.
- NOT-PAID - When payment is not received.
- PENDING - In a state of flux.

### Payment Success:

Once payment is successful, BPP sends `payment.status` as `PAID` to the BAP via /on_status.

### Payment failed:

If the payment fails, the _on\_status_ returns status: "Payment Failed" in the error object in the `message` property.

```
"error": {
  "code": "31004",
  "message": "Payment Failed"
}
```

It should also be noted that status will be `NOT-PAID` if payment fails.

## What happens when TTL expires ?

When the TTL mentioned by the seller expires with either no response or pending status, the buyer sends `NACK` as shown below.

```
"error": {
  "code": "20009",
  "message": "Payment TTL Expired"
}
```

If buyer app has already sent `NACK` after TTL expiration but payment has succeeded then the buyer uses _cancel_ and _on\_cancel_ (seller-side) for refund of the debited amount.

<img src="https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-2.x/api/images/payment_rfq.svg?raw=true" alt="Sequence Diagram" width="900" >
</div>
