### <ins>Full catalog refresh</ins> <h5>(Search - Buyer Np will request for full catalog refresh)</h5>
* Full catalog response will be sent directly by the seller NPs to the buyer NP from which the search request was received through the gateway;
* Option for distributed search by city by category:
    * Buyer NPs can optionally refresh catalogs for a city by sub-category, e.g. for Grocery (ONDC:RET10), catalog can be refreshed separately for each sub-category;
        * However, this will not be possible for categories, such as F&B, where the category hierarchy is not consistent across merchants;
    * Buyer NP can decide to refresh catalog as follows:
        * by city by sub-category for Grocery, i.e. Context.domain="ONDC:RET10", category.id = "Foodgrains";
        * only by city for F&B, i.e. Context.domain = "ONDC:RET11";
    * Distributed search i.e. by category will also allow differential buyer finder fee for different sub-categories in a domain;
* Option for buyer NP to specify whether search response should be in the form of inline response in /on_search (as of now) or as an authorized link (with limited time validity) for the buyer NP to download & ingest

Please refer to search example for [this](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-1.x/api/components/Examples/B2C/search/search_by_city.yaml)

### <ins>Full catalog refresh</ins> <h5>(On_Search - Seller Np will request for full catalog refresh)</h5>
* Full catalog refresh includes the complete catalog, per provider, for a seller NP at a point in time (as identified by Context.timestamp). If a buyer NP is caching the catalog, the list of items for a provider will be overwritten with the list of items in the catalog refresh, i.e. existing items in the buyer NP cache which aren’t in the catalog refresh will be disabled;
* However, since seller NPs may send separate catalog responses per provider (i.e. pagination by provider), it is possible that a catalog response for a provider may not be received by the buyer NP. Hence, provider(s) must be explicitly disabled, through the incremental refresh, and cannot be disabled if a response isn’t received in the catalog response;
* Following enhancements are included:
    * <ins> **Customizations & Variants** </ins>
        * Customizations may be used to create make-to-order products (e.g. F&B), by defining the base product and the mandatory & optional customizations for the product;
        * Customizations will be enabled using customization groups and individual customizations. Individual customizations are similar to SKU items (with price, inventory, veg/non-veg attributes);
        * Customizations can also be used to send special instructions e.g. for:
            * Food preparation ("less spicy", "less salt", etc.);
            * Packaging related instructions (card for "Happy Birthday", etc.);
    * Variants may be used by buyer NPs to group multiple items for display;
    * Even though the examples here show customizations & variants for specific categories, it can be used for other categories such as electronics, fashion, grocery, pharma, home & kitchen, etc.;
    * <ins> **Custom Menu** </ins>
        * Custom Menu may be used to define a provider-level menu for rendering on the buyer app. Even though the examples below show custom menus for F&B, it can be used for other categories such as electronics, fashion, grocery, etc.;
        * Custom menu structure is hierarchical and can include multiple levels;
        * Custom menu will have display sequence at each of the levels;
        * Item can be assigned to multiple menu items with ranking for display within the custom menu;
        * The menu items will have an unique display sequence, for parent & child menu items;
    * <ins> **Separate UOM & quantity for item** </ins>
    * <ins> **Offers & Promos** </ins>
        * Offers can be defined for a provider (merchant), either in the full or incremental catalog refresh;
        * An offer will include the following info:
            * offer code
            * images - can be used as banners to promote the offer from a merchant
            * time validity
        * An offer applicability criteria can include one or more of the following:
            * location(s)
            * categories
            * item(s)
        * Available offers will be available as part of the search response for the buyer NPs to render;
        * Offers may be opt-in, i.e. buyer applies offer to their cart selection by entering offer code(s) prior to checkout. In some cases, offers may be automatically applied if there is no corresponding offer code;
        * Provider will validate the offer code(s), if available, and apply the offer(s) to the cart selection;
        * Offer definitions will be templatized and the buyer NPs can create the appropriate description for the offers from the template variables and using the applicable criteria for location(s), categories, item(s)
    * <ins> **Offer template** </ins>
    * <ins> **Provider level enhancements** </ins>
        * Enabling store (i.e. location) which may have been disabled in incremental catalog refresh;
        * Provider level fulfillment options e.g. for delivery, self-pickup and the corresponding timings (for hyperlocal categories only);
        * Minimum order value;
        * Option for provider catalog zip file in lieu of embedding the json inline in the /on_search response;
        * Provider level credentials, such as certifications, awards, export/import licences etc;
        * Enhanced store timings

Please refer to on_search example for [this](https://github.com/ONDC-Official/ONDC-RET-Specifications/blob/draft-1.x/api/components/Examples/B2C/on_search/on_search_Grocery.yaml)




        


