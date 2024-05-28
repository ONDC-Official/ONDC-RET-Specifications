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

This information will also be included in subsequent APIs such as `/on_init`, `/confirm`, and `/on_confirm`. 

If the buyer wishes to cancel the order and the item is cancellable (i.e., `cancellable = true` in `/on_search`), the buyer can invoke the `/cancel` API. In response, the seller NP will cancel the order via `/on_cancel` with the cancellation charges updated in the quote.

However, if the item is not cancellable (i.e., `cancellable = false` in `/on_search`), the buyer must raise an issue through the IGM Framework. If the buyer attempts to cancel via the `/cancel` API, the seller NP will NACK that request. Upon raising the issue via the `/issue` API, the seller NP will respond with `/on_issue`, providing a resolution. The seller NP will then cancel the order via unsolicited `/on_cancel` API, providing the issue ID in fulfillments/tags and cancellation charges in the quote.