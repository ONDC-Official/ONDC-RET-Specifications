# Cancellation Flow for Exports

In the `/on_search` response, the seller NP will convey the cancellation terms to the buyer and indicate whether the item is cancellable or not.

```json
{
  "descriptor": {
    "code": "cancellable"
  },
  "value": "true"
}
```

This information will also be included in subsequent APIs such as `/on_init`, `/confirm`, and `/on_confirm`. The seller NP has the option to use the `external_ref` attribute to attach any file for communicating its cancellation terms.

```json

     "cancellation_terms": [
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Pending"
            }
          },
          "reason_required": false,
          "cancellation_fee": {
            "percentage": "0",
            "amount": {
              "currency": "IND",
              "value": "0"
            }
          },
          "external_ref": {
            "mimetype": "text/html",
            "url": "www.abc.com/cancellation_terms",
            "signature": "xxxxxxxxxxxxxx",
            "dsa": "ED25519"
          }
        },
        {
          "fulfillment_state": {
            "descriptor": {
              "code": "Packed"
            }
          },
          "reason_required": false,
          "cancellation_fee": {
            "percentage": "0",
            "amount": {
              "currency": "IND",
              "value": "0"
            }
          },
          "external_ref": {
            "mimetype": "text/html",
            "url": "www.abc.com/cancellation_terms",
            "signature": "xxxxxxxxxxxxxx",
            "dsa": "ED25519"
          }
        }
      ],

```

If the buyer wishes to cancel the order and the item is cancellable (i.e., `cancellable = true` in `/on_search`), the buyer can invoke the `/cancel` API. In response, the seller NP will send `/on_cancel` with the cancellation charges updated in the quote.

However, if the item is not cancellable (i.e., `cancellable = false` in `/on_search`), the buyer must raise an issue through the IGM Framework. If the buyer attempts to cancel via the `/cancel` API, the seller NP will NACK that request. Upon raising the issue via the `/issue` API, the seller NP will respond with `/on_issue`, providing a resolution. The buyer will then initiate an `/update` API, providing the issue ID. Finally, the seller NP will cancel the order and provide cancellation charges in the quote.