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

> Between the _/select_ and _/on\_select_ calls, the BAP and BPP negotiate the prices

## _/on_init_

BPP sends the payment gateway link. This payment gateway link has to be signed by BPP using its private key. Base64 string of the same to be sent as part of the signature. The signature algorithm used (**ED25519**) is also sent as a part of the payload.

The payload sent by the seller also contains the TTL for expiration of the transaction. This TTL is calculated w.r.t context/ttl and it should be less than or equal to TTL defined at payment gateway for payment confirmation. If the payment is still in the pending state when TTL has expired, the payment gateway cancels the transaction and initiates refund for the buyer if amount is debited.

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

The BAP can send a _status_ request to know the state of the payment transaction. The BPP returns this request with _on\_status_. This call is optional.

## _/on_status_

This is an unsolicited call which returns with the status of the payment. The returned status can be either of the three :

- PAID - Received when payment is confirmed.
- NOT-PAID - When payment is not received.
- PENDING - In a state of flux.

### Payment Success:

Once the _on\_status_ is sent as `payment.status` as `PAID` to the BAP, the buyer app sends a _confirm_ object. The seller responds with an _/on\_confirm_ acknowledgement.

> The Transaction is wrapped up in the successive _/confirm_ and _/on\_confirm calls.

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

If buyer app has already sent `NACK` after TTL expiration but payment has succeeded then the buyer uses _cancel_ and _on\_cancel_ (seller-side) for refund of the debited amount. However before /cancel, a status call is required to check the updated payment status.

<img src="https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-2.x/api/images/Non_RFQ.svg?raw=true" alt="Sequence Diagram" width="900" >
</div>
