### <ins>Offer Template</ins>

<table style="table-layout: fixed;">
  <tbody>
    <tr>
      <th style="width: 24%;"></th>
      <th style="width: 20%;">Cart</th>
      <th style="width: 59%;">Offer</th>
    </tr>
  </tbody>
</table>

| No | Offer id | Offer code | Min value| Item count| Offered value | Offered value (cap)| Item count|Item id | Item value |
| ---|----------|-------------|-------- | --------- | ------------- | ------------------ | ----------| ------- | -----------|
| 1 | DISCP60 | Disc_Pct | ₹159  | | -60%  | -₹120 |  |  |  |
| 2 | DISCA150 | Disc_Amt | ₹499  | | -150 | |  |  |  |
| 3 | BUY2GET3 | BuyXGetY |  | 2| ₹0 |  | 3 |  |  |
| 4 | FREEBIE | Freebie | ₹598  | | ₹0 | | 1  | sku_id  |  ₹200 |

</br>
Please refer to on_select Disc60 example for [this](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-1.x/api/components/Examples/B2C Exports/on_select/on_select_DISCP60_applied.yaml)

In the offer template above:
* **Offer id** - unique offer code from provider;
* **Offer code** - standard offer type per the contract:
    * **Disc_Pct** - discount percent applied to the cart value, with or without a cap, and may be based on minimum cart value;
    * **Disc_Amt** - flat discount amount applied to the cart value, and may be based on minimum cart value;
    * **BuyXGetY** - for every "X" item count in the cart, total of "Y" items will be offered (i.e. "Y" - "X" additional items), for free or at non-zero offered value;
    * **FREEBIE** - for a minimum order value, 1 or more free item(s) will be offered at 0 value;
* **Cart variables**:
    * **Min value** - min cart value for the offer to be applicable;
    * **Item count** - min count of items in the cart for the offer to be applicable;
* **Offer variables**:
    * **Offered value** - discount on the cart value (-ve) or item value for extra items offered (0 or higher);
    * **Offered value** (cap) - cap on the discount on cart value;
    * **Item count** - total count of items offered;
    * **Item id** - additional item offered;
    * **Item value** - actual value of item being offered at the offered value

Description of the above offers:
* **DISCP60** - 60% off up to ₹120, for order value above ₹159;
* **DISCA150** - flat 150 off, for order value above ₹499;
* **BUY2GET3** - buy 2 items, get additional item for free or for offered price;
* **FREEBIE** - free item (of value ₹200) for order value above ₹598