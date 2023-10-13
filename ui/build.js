let build_spec = {
  openapi: "3.0.0",
  info: {
    title: "ONDC Specification",
    description: "ONDC Specification",
    version: "2.0.1",
  },
  security: [{ SubscriberAuth: [] }],
  paths: {
    "/search": {
      post: {
        tags: ["Provider Platform", "Gateway"],
        description:
          "Consumer Platform declares the customer's intent to buy/avail products or services",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      { properties: { action: { enum: ["search"] } } },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      intent: { $ref: "#/components/schemas/Intent" },
                    },
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/select": {
      post: {
        tags: ["Provider Platform"],
        description:
          "Consumer Platform declares the customer's cart (or equivalent) created by selecting objects from the catalog",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["select"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/init": {
      post: {
        tags: ["Provider Platform"],
        description:
          "Initialize an order by providing billing and/or shipping details",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["init"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: {
            description:
              "Acknowledgement of message received after successful validation of schema and signature",
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    message: {
                      type: "object",
                      properties: {
                        ack: {
                          allOf: [
                            { $ref: "#/components/schemas/Ack" },
                            {
                              properties: { status: { enum: ["ACK", "NACK"] } },
                            },
                          ],
                        },
                      },
                      required: ["ack"],
                    },
                    error: { $ref: "#/components/schemas/Error" },
                  },
                  required: ["message"],
                },
              },
            },
          },
        },
      },
    },
    "/confirm": {
      post: {
        tags: ["Provider Platform"],
        description:
          "Initialize an order by providing billing and/or shipping details",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["confirm"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/status": {
      post: {
        tags: ["Provider Platform"],
        description: "Fetch the latest order object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["status"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order_id: {
                        $ref: "#/components/schemas/Order/properties/id",
                      },
                    },
                    required: ["order_id"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/track": {
      post: {
        tags: ["Provider Platform"],
        description: "Track an active order",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["track"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order_id: {
                        $ref: "#/components/schemas/Order/properties/id",
                      },
                      callback_url: { type: "string", format: "uri" },
                    },
                    required: ["order_id"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/cancel": {
      post: {
        tags: ["Provider Platform"],
        description: "Cancel an order",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["cancel"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order_id: {
                        $ref: "#/components/schemas/Order/properties/id",
                      },
                      cancellation_reason_id: {
                        $ref: "#/components/schemas/Option/properties/id",
                      },
                      descriptor: { $ref: "#/components/schemas/Descriptor" },
                    },
                    required: ["order_id"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/update": {
      post: {
        tags: ["Provider Platform"],
        description: "Remove object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["update"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      update_target: {
                        description:
                          'Comma separated values of order objects being updated. For example: ```"update_target":"item,billing,fulfillment"```',
                        type: "string",
                      },
                      order: {
                        description: "Updated order object",
                        allOf: [{ $ref: "#/components/schemas/Order" }],
                      },
                    },
                    required: ["update_target", "order"],
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/rating": {
      post: {
        tags: ["Provider Platform"],
        description: "Provide feedback on a service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["rating"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      ratings: {
                        type: "array",
                        items: { $ref: "#/components/schemas/Rating" },
                      },
                    },
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/support": {
      post: {
        tags: ["Provider Platform"],
        description: "Contact support",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["support"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      support: { $ref: "#/components/schemas/Support" },
                    },
                  },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_search": {
      post: {
        tags: ["Consumer Platform"],
        description:
          "Provider Platform sends its catalog in response to a search request.",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_search"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      catalog: { $ref: "#/components/schemas/Catalog" },
                    },
                    required: ["catalog"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_select": {
      post: {
        tags: ["Consumer Platform"],
        description:
          "Send draft order object with quoted price for selected items",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_select"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_init": {
      post: {
        tags: ["Consumer Platform"],
        description: "Send order object with payment details updated",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_init"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_confirm": {
      post: {
        tags: ["Consumer Platform"],
        description: "Send active order object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_confirm"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_track": {
      post: {
        tags: ["Consumer Platform"],
        description: "Send tracking details of an active order",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_track"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      tracking: { $ref: "#/components/schemas/Tracking" },
                    },
                    required: ["tracking"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_cancel": {
      post: {
        tags: ["Consumer Platform"],
        description:
          "Send cancellation request_id with reasons list in case of cancellation request. Else send cancelled order object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_cancel"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_update": {
      post: {
        tags: ["Consumer Platform"],
        description: "Returns updated service with updated runtime object",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_update"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_status": {
      post: {
        tags: ["Consumer Platform"],
        description: "Fetch the status of a Service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_status"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      order: { $ref: "#/components/schemas/Order" },
                    },
                    required: ["order"],
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_rating": {
      post: {
        tags: ["Consumer Platform"],
        description: "Provide feedback on a service",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_rating"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      feedback_form: {
                        description:
                          "A feedback form to allow the user to provide additional information on the rating provided",
                        allOf: [{ $ref: "#/components/schemas/XInput" }],
                      },
                    },
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context", "message"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
    "/on_support": {
      post: {
        tags: ["Consumer Platform"],
        description: "Contact Support",
        requestBody: {
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  context: {
                    allOf: [
                      { $ref: "#/components/schemas/Context" },
                      {
                        properties: { action: { enum: ["on_support"] } },
                        required: ["action"],
                      },
                    ],
                  },
                  message: {
                    type: "object",
                    properties: {
                      support: { $ref: "#/components/schemas/Support" },
                    },
                  },
                  error: { $ref: "#/components/schemas/Error" },
                },
                required: ["context"],
              },
            },
          },
        },
        responses: {
          default: { $ref: "#/paths/~1init/post/responses/default" },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      SubscriberAuth: {
        type: "apiKey",
        in: "header",
        name: "Authorization",
        description:
          'Signature of message body using Consumer Platform or Provider Platform subscriber\'s signing public key. <br/><br/>Format:<br/><br/><code>Authorization : Signature keyId="{subscriber_id}|{unique_key_id}|{algorithm}",algorithm="ed25519",created="1606970629",expires="1607030629",headers="(created) (expires) digest",signature="Base64(signing string)"</code>',
      },
    },
    schemas: {
      Ack: {
        description:
          "Describes the acknowledgement sent in response to an API call. If the implementation uses HTTP/S, then Ack must be returned in the same session. Every API call to a BPP must be responded to with an Ack whether the BPP intends to respond with a callback or not. This has one property called `status` that indicates the status of the Acknowledgement.",
        type: "object",
        properties: {
          status: {
            type: "string",
            description:
              "The status of the acknowledgement. If the request passes the validation criteria of the BPP, then this is set to ACK. If a BPP responds with status = `ACK` to a request, it is required to respond with a callback. If the request fails the validation criteria, then this is set to NACK. Additionally, if a BPP does not intend to respond with a callback even after the request meets the validation criteria, it should set this value to `NACK`.",
            enum: ["ACK", "NACK"],
          },
          tags: {
            description:
              "A list of tags containing any additional information sent along with the Acknowledgement.",
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      AddOn: {
        description:
          "Describes an additional item offered as a value-addition to a product or service. This does not exist independently in a catalog and is always associated with an item.",
        type: "object",
        properties: {
          id: {
            description: "Provider-defined ID of the add-on",
            type: "string",
          },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          price: { $ref: "#/components/schemas/Price" },
        },
      },
      Address: { description: "Describes a postal address.", type: "string" },
      Agent: {
        description:
          "Describes the direct performer, driver or executor that fulfills an order. It is usually a person. But in some rare cases, it could be a non-living entity like a drone, or a bot. Some examples of agents are Doctor in the healthcare sector, a driver in the mobility sector, or a delivery person in the logistics sector. This object can be set at any stage of the order lifecycle. This can be set at the discovery stage when the BPP wants to provide details on the agent fulfilling the order, like in healthcare, where the doctor's name appears during search. This object can also used to search for a particular person that the customer wants fulfilling an order. Sometimes, this object gets instantiated after the order is confirmed, like in the case of on-demand taxis, where the driver is assigned after the user confirms the ride.",
        properties: {
          person: { $ref: "#/components/schemas/Person" },
          contact: { $ref: "#/components/schemas/Contact" },
          organization: { $ref: "#/components/schemas/Organization" },
          rating: { $ref: "#/components/schemas/Rating/properties/value" },
        },
      },
      Authorization: {
        description:
          "Describes an authorization mechanism used to start or end the fulfillment of an order. For example, in the mobility sector, the driver may require a one-time password to initiate the ride. In the healthcare sector, a patient may need to provide a password to open a video conference link during a teleconsultation.",
        type: "object",
        properties: {
          type: {
            description:
              "Type of authorization mechanism used. The allowed values for this field can be published as part of the network policy.",
            type: "string",
          },
          token: {
            description:
              "Token used for authorization. This is typically generated at the BPP. The BAP can send this value to the user via any channel that it uses to authenticate the user like SMS, Email, Push notification, or in-app rendering.",
            type: "string",
          },
          valid_from: {
            description:
              "Timestamp in RFC3339 format from which token is valid",
            type: "string",
            format: "date-time",
          },
          valid_to: {
            description:
              "Timestamp in RFC3339 format until which token is valid",
            type: "string",
            format: "date-time",
          },
          status: { description: "Status of the token", type: "string" },
        },
      },
      Billing: {
        description:
          "Describes the billing details of an entity.<br>This has properties like name,organization,address,email,phone,time,tax_number, created_at,updated_at",
        type: "object",
        properties: {
          name: { description: "Name of the billable entity", type: "string" },
          organization: {
            description: "Details of the organization being billed.",
            allOf: [{ $ref: "#/components/schemas/Organization" }],
          },
          address: {
            description: "The address of the billable entity",
            allOf: [{ $ref: "#/components/schemas/Address" }],
          },
          state: {
            description:
              "The state where the billable entity resides. This is important for state-level tax calculation",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          city: {
            description: "The city where the billable entity resides.",
            allOf: [{ $ref: "#/components/schemas/City" }],
          },
          email: {
            description: "Email address where the bill is sent to",
            type: "string",
            format: "email",
          },
          phone: {
            description: "Phone number of the billable entity",
            type: "string",
          },
          time: {
            description: "Details regarding the billing period",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          tax_id: {
            description:
              "ID of the billable entity as recognized by the taxation authority",
            type: "string",
          },
        },
      },
      Cancellation: {
        description: "Describes a cancellation event",
        type: "object",
        properties: {
          time: {
            description: "Date-time when the order was cancelled by the buyer",
            type: "string",
            format: "date-time",
          },
          cancelled_by: { type: "string", enum: ["CONSUMER", "PROVIDER"] },
          reason: {
            description: "The reason for cancellation",
            allOf: [{ $ref: "#/components/schemas/Option" }],
          },
          additional_description: {
            description:
              "Any additional information regarding the nature of cancellation",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
        },
      },
      CancellationTerm: {
        description:
          "Describes the cancellation terms of an item or an order. This can be referenced at an item or order level. Item-level cancellation terms can override the terms at the order level.",
        type: "object",
        properties: {
          fulfillment_state: {
            description:
              "The state of fulfillment during which this term is applicable.",
            allOf: [{ $ref: "#/components/schemas/FulfillmentState" }],
          },
          reason_required: {
            description:
              "Indicates whether a reason is required to cancel the order",
            type: "boolean",
          },
          cancel_by: {
            description: "Information related to the time of cancellation.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          cancellation_fee: { $ref: "#/components/schemas/Fee" },
          xinput: { $ref: "#/components/schemas/XInput" },
          external_ref: { $ref: "#/components/schemas/MediaFile" },
        },
      },
      Catalog: {
        description:
          "Describes the products or services offered by a BPP. This is typically sent as the response to a search intent from a BAP. The payment terms, offers and terms of fulfillment supported by the BPP can also be included here. The BPP can show hierarchical nature of products/services in its catalog using the parent_category_id in categories. The BPP can also send a ttl (time to live) in the context which is the duration for which a BAP can cache the catalog and use the cached catalog.  <br>This has properties like bbp/descriptor,bbp/categories,bbp/fulfillments,bbp/payments,bbp/offers,bbp/providers and exp<br>This is used in the following situations.<br><ul><li>This is typically used in the discovery stage when the BPP sends the details of the products and services it offers as response to a search intent from the BAP. </li></ul>",
        type: "object",
        properties: {
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          fulfillments: {
            description:
              "Fulfillment modes offered at the BPP level. This is used when a BPP itself offers fulfillments on behalf of the providers it has onboarded.",
            type: "array",
            items: { $ref: "#/components/schemas/Fulfillment" },
          },
          payments: {
            description:
              "Payment terms offered by the BPP for all transactions. This can be overriden at the provider level.",
            type: "array",
            items: { $ref: "#/components/schemas/Payment" },
          },
          offers: {
            description:
              "Offers at the BPP-level. This is common across all providers onboarded by the BPP.",
            type: "array",
            items: { $ref: "#/components/schemas/Offer" },
          },
          providers: {
            type: "array",
            items: { $ref: "#/components/schemas/Provider" },
          },
          exp: {
            description: "Timestamp after which catalog will expire",
            type: "string",
            format: "date-time",
          },
          ttl: {
            description:
              "Duration in seconds after which this catalog will expire",
            type: "string",
          },
        },
      },
      Category: {
        description:
          "A label under which a collection of items can be grouped.",
        type: "object",
        properties: {
          id: { description: "ID of the category", type: "string" },
          parent_category_id: {
            $ref: "#/components/schemas/Category/properties/id",
          },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          time: { $ref: "#/components/schemas/Time" },
          ttl: { description: "Time to live for an instance of this schema" },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Circle: {
        description:
          "Describes a circular region of a specified radius centered at a specified GPS coordinate.",
        type: "object",
        properties: {
          gps: { $ref: "#/components/schemas/Gps" },
          radius: { $ref: "#/components/schemas/Scalar" },
        },
      },
      City: {
        description: "Describes a city",
        type: "object",
        properties: {
          name: { description: "Name of the city", type: "string" },
          code: { description: "City code", type: "string" },
        },
      },
      Contact: {
        description: "Describes the contact information of an entity",
        type: "object",
        properties: {
          phone: { type: "string" },
          email: { type: "string" },
          jcard: {
            type: "object",
            description:
              "A Jcard object as per draft-ietf-jcardcal-jcard-03 specification",
          },
        },
      },
      Context: {
        description:
          "Every API call in beckn protocol has a context. It provides a high-level overview to the receiver about the nature of the intended transaction. Typically, it is the BAP that sets the transaction context based on the consumer's location and action on their UI. But sometimes, during unsolicited callbacks, the BPP also sets the transaction context but it is usually the same as the context of a previous full-cycle, request-callback interaction between the BAP and the BPP. The context object contains four types of fields. <ol><li>Demographic information about the transaction using fields like `domain`, `country`, and `region`.</li><li>Addressing details like the sending and receiving platform's ID and API URL.</li><li>Interoperability information like the protocol version that implemented by the sender and,</li><li>Transaction details like the method being called at the receiver's endpoint, the transaction_id that represents an end-to-end user session at the BAP, a message ID to pair requests with callbacks, a timestamp to capture sending times, a ttl to specifiy the validity of the request, and a key to encrypt information if necessary.</li></ol> This object must be passed in every interaction between a BAP and a BPP. In HTTP/S implementations, it is not necessary to send the context during the synchronous response. However, in asynchronous protocols, the context must be sent during all interactions,",
        type: "object",
        properties: {
          domain: {
            description:
              "Domain code that is relevant to this transaction context",
            allOf: [{ $ref: "#/components/schemas/Domain/properties/code" }],
          },
          location: {
            description:
              "The location where the transaction is intended to be fulfilled.",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          action: {
            description:
              "The Beckn protocol method being called by the sender and executed at the receiver.",
            type: "string",
          },
          version: {
            type: "string",
            description:
              "Version of transaction protocol being used by the sender.",
          },
          bap_id: {
            description: "Subscriber ID of the BAP",
            allOf: [
              {
                description:
                  "A globally unique identifier of the platform, Typically it is the fully qualified domain name (FQDN) of the platform.",
                type: "string",
              },
            ],
          },
          bap_uri: {
            description:
              "Subscriber URL of the BAP for accepting callbacks from BPPs.",
            allOf: [
              {
                description:
                  "The callback URL of the Subscriber. This should necessarily contain the same domain name as set in `subscriber_id``.",
                type: "string",
                format: "uri",
              },
            ],
          },
          bpp_id: {
            description: "Subscriber ID of the BPP",
            allOf: [
              {
                $ref: "#/components/schemas/Context/properties/bap_id/allOf/0",
              },
            ],
          },
          bpp_uri: {
            description:
              "Subscriber URL of the BPP for accepting calls from BAPs.",
            allOf: [
              {
                $ref: "#/components/schemas/Context/properties/bap_uri/allOf/0",
              },
            ],
          },
          transaction_id: {
            description:
              "This is a unique value which persists across all API calls from `search` through `confirm`. This is done to indicate an active user session across multiple requests. The BPPs can use this value to push personalized recommendations, and dynamic offerings related to an ongoing transaction despite being unaware of the user active on the BAP.",
            type: "string",
            format: "uuid",
          },
          message_id: {
            description:
              "This is a unique value which persists during a request / callback cycle. Since beckn protocol APIs are asynchronous, BAPs need a common value to match an incoming callback from a BPP to an earlier call. This value can also be used to ignore duplicate messages coming from the BPP. It is recommended to generate a fresh message_id for every new interaction. When sending unsolicited callbacks, BPPs must generate a new message_id.",
            type: "string",
            format: "uuid",
          },
          timestamp: {
            description: "Time of request generation in RFC3339 format",
            type: "string",
            format: "date-time",
          },
          key: {
            description: "The encryption public key of the sender",
            type: "string",
          },
          ttl: {
            description:
              "The duration in ISO8601 format after timestamp for which this message holds valid",
            type: "string",
          },
        },
      },
      Country: {
        description: "Describes a country",
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the country" },
          code: {
            type: "string",
            description: "Country code as per ISO 3166-1 and ISO 3166-2 format",
          },
        },
      },
      Credential: {
        description:
          "Describes a credential of an entity - Person or Organization",
        type: "object",
        properties: {
          id: { type: "string" },
          type: { type: "string", default: "VerifiableCredential" },
          url: {
            description: "URL of the credential",
            type: "string",
            format: "uri",
          },
        },
      },
      Customer: {
        description:
          "Describes a customer buying/availing a product or a service",
        type: "object",
        properties: {
          person: { $ref: "#/components/schemas/Person" },
          contact: { $ref: "#/components/schemas/Contact" },
        },
      },
      DecimalValue: {
        description: "Describes a numerical value in decimal form",
        type: "string",
        pattern: "[+-]?([0-9]*[.])?[0-9]+",
      },
      Descriptor: {
        description: "Physical description of something.",
        type: "object",
        properties: {
          name: { type: "string" },
          code: { type: "string" },
          short_desc: { type: "string" },
          long_desc: { type: "string" },
          additional_desc: {
            type: "object",
            properties: {
              url: { type: "string" },
              content_type: {
                type: "string",
                enum: ["text/plain", "text/html", "application/json"],
              },
            },
          },
          media: {
            type: "array",
            items: { $ref: "#/components/schemas/MediaFile" },
          },
          images: {
            type: "array",
            items: { $ref: "#/components/schemas/Image" },
          },
        },
      },
      Domain: {
        description:
          "Described the industry sector or sub-sector. The network policy should contain codes for all the industry sectors supported by the network. Domains can be created in varying levels of granularity. The granularity of a domain can be decided by the participants of the network. Too broad domains will result in irrelevant search broadcast calls to BPPs that don't have services supporting the domain. Too narrow domains will result in a large number of registry entries for each BPP. It is recommended that network facilitators actively collaborate with various working groups and network participants to carefully choose domain codes keeping in mind relevance, performance, and opportunity cost. It is recommended that networks choose broad domains like mobility, logistics, healthcare etc, and progressively granularize them as and when the number of network participants for each domain grows large.",
        type: "object",
        properties: {
          name: { description: "Name of the domain", type: "string" },
          code: {
            description:
              "Standard code representing the domain. The standard is usually published as part of the network policy. Furthermore, the network facilitator should also provide a mechanism to provide the supported domains of a network.",
          },
          additional_info: {
            description:
              "A url that contains addtional information about that domain.",
            allOf: [{ $ref: "#/components/schemas/MediaFile" }],
          },
        },
      },
      Duration: {
        description: "Describes duration as per ISO8601 format",
        type: "string",
      },
      Error: {
        description:
          "Describes an error object that is returned by a BAP, BPP or BG as a response or callback to an action by another network participant. This object is sent when any request received by a network participant is unacceptable. This object can be sent either during Ack or with the callback.",
        type: "object",
        properties: {
          code: {
            type: "string",
            description:
              'Standard error code. For full list of error codes, refer to docs/protocol-drafts/BECKN-005-ERROR-CODES-DRAFT-01.md of this repo"',
          },
          paths: {
            type: "string",
            description:
              "Path to json schema generating the error. Used only during json schema validation errors",
          },
          message: {
            type: "string",
            description:
              "Human readable message describing the error. Used mainly for logging. Not recommended to be shown to the user.",
          },
        },
      },
      Fee: {
        description: "A fee applied on a particular entity",
        type: "object",
        properties: {
          percentage: {
            description: "Percentage of a value",
            allOf: [{ $ref: "#/components/schemas/DecimalValue" }],
          },
          amount: {
            description: "A fixed value",
            allOf: [{ $ref: "#/components/schemas/Price" }],
          },
        },
      },
      Form: {
        description: "Describes a form",
        type: "object",
        properties: {
          url: {
            description:
              "The URL from where the form can be fetched. The content fetched from the url must be processed as per the mime_type specified in this object. Once fetched, the rendering platform can choosed to render the form as-is as an embeddable element; or process it further to blend with the theme of the application. In case the interface is non-visual, the the render can process the form data and reproduce it as per the standard specified in the form.",
            type: "string",
            format: "uri",
          },
          data: {
            description: "The form submission data",
            type: "object",
            additionalProperties: { type: "string" },
          },
          mime_type: {
            description:
              "This field indicates the nature and format of the form received by querying the url. MIME types are defined and standardized in IETF's RFC 6838.",
            type: "string",
            enum: ["text/html", "application/xml"],
          },
          submission_id: { type: "string", format: "uuid" },
        },
      },
      Fulfillment: {
        description:
          "Describes how a an order will be rendered/fulfilled to the end-customer",
        type: "object",
        properties: {
          id: {
            description: "Unique reference ID to the fulfillment of an order",
            type: "string",
          },
          type: {
            description:
              "A code that describes the mode of fulfillment. This is typically set when there are multiple ways an order can be fulfilled. For example, a retail order can be fulfilled either via store pickup or a home delivery. Similarly, a medical consultation can be provided either in-person or via tele-consultation. The network policy must publish standard fulfillment type codes for the different modes of fulfillment.",
            type: "string",
          },
          rateable: {
            description: "Whether the fulfillment can be rated or not",
            type: "boolean",
          },
          rating: {
            description: "The rating value of the fulfullment service.",
            allOf: [{ $ref: "#/components/schemas/Rating/properties/value" }],
          },
          state: {
            description:
              "The current state of fulfillment. The BPP must set this value whenever the state of the order fulfillment changes and fire an unsolicited `on_status` call.",
            allOf: [{ $ref: "#/components/schemas/FulfillmentState" }],
          },
          tracking: {
            type: "boolean",
            description: "Indicates whether the fulfillment allows tracking",
            default: false,
          },
          customer: {
            description: "The person that will ultimately receive the order",
            allOf: [{ $ref: "#/components/schemas/Customer" }],
          },
          agent: {
            description:
              "The agent that is currently handling the fulfillment of the order",
            allOf: [{ $ref: "#/components/schemas/Agent" }],
          },
          contact: { $ref: "#/components/schemas/Contact" },
          vehicle: { $ref: "#/components/schemas/Vehicle" },
          stops: {
            description:
              "The list of logical stops encountered during the fulfillment of an order.",
            type: "array",
            items: { $ref: "#/components/schemas/Stop" },
          },
          path: {
            description:
              "The physical path taken by the agent that can be rendered on a map. The allowed format of this property can be set by the network.",
            type: "string",
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      FulfillmentState: {
        description: "Describes the state of fulfillment",
        type: "object",
        properties: {
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          updated_at: { type: "string", format: "date-time" },
          updated_by: {
            type: "string",
            description: "ID of entity which changed the state",
          },
        },
      },
      Gps: {
        description: "Describes a GPS coordinate",
        type: "string",
        pattern:
          "^[-+]?([1-8]?\\d(\\.\\d+)?|90(\\.0+)?),\\s*[-+]?(180(\\.0+)?|((1[0-7]\\d)|([1-9]?\\d))(\\.\\d+)?)$",
      },
      Image: {
        description: "Describes an image",
        type: "object",
        properties: {
          url: {
            description:
              "URL to the image. This can be a data url or an remote url",
            type: "string",
            format: "uri",
          },
          size_type: {
            description:
              "The size of the image. The network policy can define the default dimensions of each type",
            type: "string",
            enum: ["xs", "sm", "md", "lg", "xl", "custom"],
          },
          width: {
            description: "Width of the image in pixels",
            type: "string",
          },
          height: {
            description: "Height of the image in pixels",
            type: "string",
          },
        },
      },
      Intent: {
        description:
          "The intent to buy or avail a product or a service. The BAP can declare the intent of the consumer containing <ul><li>What they want (A product, service, offer)</li><li>Who they want (A seller, service provider, agent etc)</li><li>Where they want it and where they want it from</li><li>When they want it (start and end time of fulfillment</li><li>How they want to pay for it</li></ul><br>This has properties like descriptor,provider,fulfillment,payment,category,offer,item,tags<br>This is typically used by the BAP to send the purpose of the user's search to the BPP. This will be used by the BPP to find products or services it offers that may match the user's intent.<br>For example, in Mobility, the mobility consumer declares a mobility intent. In this case, the mobility consumer declares information that describes various aspects of their journey like,<ul><li>Where would they like to begin their journey (intent.fulfillment.start.location)</li><li>Where would they like to end their journey (intent.fulfillment.end.location)</li><li>When would they like to begin their journey (intent.fulfillment.start.time)</li><li>When would they like to end their journey (intent.fulfillment.end.time)</li><li>Who is the transport service provider they would like to avail services from (intent.provider)</li><li>Who is traveling (This is not recommended in public networks) (intent.fulfillment.customer)</li><li>What kind of fare product would they like to purchase (intent.item)</li><li>What add-on services would they like to avail</li><li>What offers would they like to apply on their booking (intent.offer)</li><li>What category of services would they like to avail (intent.category)</li><li>What additional luggage are they carrying</li><li>How would they like to pay for their journey (intent.payment)</li></ul><br>For example, in health domain, a consumer declares the intent for a lab booking the describes various aspects of their booking like,<ul><li>Where would they like to get their scan/test done (intent.fulfillment.start.location)</li><li>When would they like to get their scan/test done (intent.fulfillment.start.time)</li><li>When would they like to get the results of their test/scan (intent.fulfillment.end.time)</li><li>Who is the service provider they would like to avail services from (intent.provider)</li><li>Who is getting the test/scan (intent.fulfillment.customer)</li><li>What kind of test/scan would they like to purchase (intent.item)</li><li>What category of services would they like to avail (intent.category)</li><li>How would they like to pay for their journey (intent.payment)</li></ul>",
        type: "object",
        properties: {
          descriptor: {
            description:
              "A raw description of the search intent. Free text search strings, raw audio, etc can be sent in this object.",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          provider: {
            description:
              "The provider from which the customer wants to place to the order from",
            allOf: [{ $ref: "#/components/schemas/Provider" }],
          },
          fulfillment: {
            description:
              "Details on how the customer wants their order fulfilled",
            allOf: [{ $ref: "#/components/schemas/Fulfillment" }],
          },
          payment: {
            description:
              "Details on how the customer wants to pay for the order",
            allOf: [{ $ref: "#/components/schemas/Payment" }],
          },
          category: {
            description: "Details on the item category",
            allOf: [{ $ref: "#/components/schemas/Category" }],
          },
          offer: {
            description: "details on the offer the customer wants to avail",
            allOf: [{ $ref: "#/components/schemas/Offer" }],
          },
          item: {
            description: "Details of the item that the consumer wants to order",
            allOf: [{ $ref: "#/components/schemas/Item" }],
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      ItemQuantity: {
        description: "Describes the count or amount of an item",
        type: "object",
        properties: {
          allocated: {
            description:
              "This represents the exact quantity allocated for purchase of the item.",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          available: {
            description:
              "This represents the exact quantity available for purchase of the item. The buyer can only purchase multiples of this",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          maximum: {
            description:
              "This represents the maximum quantity allowed for purchase of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 1 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          minimum: {
            description:
              "This represents the minimum quantity allowed for purchase of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          selected: {
            description:
              "This represents the quantity selected for purchase of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 0 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
          unitized: {
            description:
              "This represents the quantity available in a single unit of the item",
            type: "object",
            properties: {
              count: { type: "integer", minimum: 1, maximum: 1 },
              measure: { $ref: "#/components/schemas/Scalar" },
            },
          },
        },
      },
      Item: {
        description:
          "Describes a product or a service offered to the end consumer by the provider. In the mobility sector, it can represent a fare product like one way journey. In the logistics sector, it can represent the delivery service offering. In the retail domain it can represent a product like a grocery item.",
        type: "object",
        properties: {
          id: { description: "ID of the item.", type: "string" },
          parent_item_id: {
            description: "ID of the item, this item is a variant of",
            allOf: [{ $ref: "#/components/schemas/Item/properties/id" }],
          },
          parent_item_quantity: {
            description:
              "The number of units of the parent item this item is a multiple of",
            allOf: [{ $ref: "#/components/schemas/ItemQuantity" }],
          },
          descriptor: {
            description: "Physical description of the item",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          creator: {
            description: "The creator of this item",
            allOf: [{ $ref: "#/components/schemas/Organization" }],
          },
          price: {
            description: "The price of this item, if it has intrinsic value",
            allOf: [{ $ref: "#/components/schemas/Price" }],
          },
          quantity: {
            description: "The selling quantity of the item",
            allOf: [{ $ref: "#/components/schemas/ItemQuantity" }],
          },
          category_ids: {
            description: "Categories this item can be listed under",
            type: "array",
            items: {
              allOf: [{ $ref: "#/components/schemas/Category/properties/id" }],
            },
          },
          fulfillment_ids: {
            description: "Modes through which this item can be fulfilled",
            type: "array",
            items: {
              allOf: [
                { $ref: "#/components/schemas/Fulfillment/properties/id" },
              ],
            },
          },
          location_ids: {
            description: "Provider Locations this item is available in",
            type: "array",
            items: {
              allOf: [{ $ref: "#/components/schemas/Location/properties/id" }],
            },
          },
          payment_ids: {
            description:
              "Payment modalities through which this item can be ordered",
            type: "array",
            items: {
              allOf: [{ $ref: "#/components/schemas/Payment/properties/id" }],
            },
          },
          add_ons: {
            type: "array",
            items: { $ref: "#/components/schemas/AddOn" },
          },
          cancellation_terms: {
            description: "Cancellation terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/CancellationTerm" },
          },
          refund_terms: {
            description: "Refund terms of this item",
            type: "array",
            items: {
              description: "Refund term of an item or an order",
              type: "object",
              properties: {
                fulfillment_state: {
                  description:
                    "The state of fulfillment during which this term is applicable.",
                  allOf: [{ $ref: "#/components/schemas/State" }],
                },
                refund_eligible: {
                  description:
                    "Indicates if cancellation will result in a refund",
                  type: "boolean",
                },
                refund_within: {
                  description:
                    "Time within which refund will be processed after successful cancellation.",
                  allOf: [{ $ref: "#/components/schemas/Time" }],
                },
                refund_amount: { $ref: "#/components/schemas/Price" },
              },
            },
          },
          replacement_terms: {
            description:
              "Terms that are applicable be met when this item is replaced",
            type: "array",
            items: { $ref: "#/components/schemas/ReplacementTerm" },
          },
          return_terms: {
            description: "Terms that are applicable when this item is returned",
            type: "array",
            items: { $ref: "#/components/schemas/ReturnTerm" },
          },
          xinput: {
            description:
              "Additional input required from the customer to purchase / avail this item",
            allOf: [{ $ref: "#/components/schemas/XInput" }],
          },
          time: {
            description:
              "Temporal attributes of this item. This property is used when the item exists on the catalog only for a limited period of time.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          rateable: {
            description: "Whether this item can be rated",
            type: "boolean",
          },
          rating: {
            description: "The rating of the item",
            allOf: [{ $ref: "#/components/schemas/Rating/properties/value" }],
          },
          matched: {
            description: "Whether this item is an exact match of the request",
            type: "boolean",
          },
          related: {
            description:
              "Whether this item is a related item to the exactly matched item",
            type: "boolean",
          },
          recommended: {
            description:
              "Whether this item is a recommended item to a response",
            type: "boolean",
          },
          ttl: {
            description:
              "Time to live in seconds for an instance of this schema",
            type: "string",
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Location: {
        description: "The physical location of something",
        type: "object",
        properties: {
          id: { type: "string" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          map_url: {
            description:
              "The url to the map of the location. This can be a globally recognized map url or the one specified by the network policy.",
            type: "string",
            format: "uri",
          },
          gps: {
            description: "The GPS co-ordinates of this location.",
            allOf: [{ $ref: "#/components/schemas/Gps" }],
          },
          address: {
            description: "The address of this location.",
            allOf: [{ $ref: "#/components/schemas/Address" }],
          },
          city: {
            description: "The city this location is, or is located within",
            allOf: [{ $ref: "#/components/schemas/City" }],
          },
          district: {
            description: "The state this location is, or is located within",
            type: "string",
          },
          state: {
            description: "The state this location is, or is located within",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          country: {
            description: "The country this location is, or is located within",
            allOf: [{ $ref: "#/components/schemas/Country" }],
          },
          area_code: { type: "string" },
          circle: { $ref: "#/components/schemas/Circle" },
          polygon: {
            description: "The boundary polygon of this location",
            type: "string",
          },
          "3dspace": {
            description:
              "The three dimensional region describing this location",
            type: "string",
          },
          rating: {
            description: "The rating of this location",
            allOf: [{ $ref: "#/components/schemas/Rating/properties/value" }],
          },
        },
      },
      MediaFile: {
        description: "This object contains a url to a media file.",
        type: "object",
        properties: {
          mimetype: {
            description:
              "indicates the nature and format of the document, file, or assortment of bytes. MIME types are defined and standardized in IETF's RFC 6838",
            type: "string",
          },
          url: {
            description: "The URL of the file",
            type: "string",
            format: "uri",
          },
          signature: {
            description:
              "The digital signature of the file signed by the sender",
            type: "string",
          },
          dsa: {
            description: "The signing algorithm used by the sender",
            type: "string",
          },
        },
      },
      Offer: {
        description:
          "An offer associated with a catalog. This is typically used to promote a particular product and enable more purchases.",
        type: "object",
        properties: {
          id: { type: "string" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          location_ids: {
            type: "array",
            items: { $ref: "#/components/schemas/Location/properties/id" },
          },
          category_ids: {
            type: "array",
            items: { $ref: "#/components/schemas/Category/properties/id" },
          },
          item_ids: {
            type: "array",
            items: { $ref: "#/components/schemas/Item/properties/id" },
          },
          time: { $ref: "#/components/schemas/Time" },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Option: {
        description: "Describes a selectable option",
        type: "object",
        properties: {
          id: { type: "string" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
        },
      },
      Order: {
        description:
          "Describes a legal purchase order. It contains the complete details of the legal contract created between the buyer and the seller.",
        type: "object",
        properties: {
          id: {
            type: "string",
            description:
              "Human-readable ID of the order. This is generated at the BPP layer. The BPP can either generate order id within its system or forward the order ID created at the provider level.",
          },
          ref_order_ids: {
            description:
              "A list of order IDs to link this order to previous orders.",
            type: "array",
            items: { type: "string", description: "ID of a previous order" },
          },
          status: {
            description:
              "Status of the order. Allowed values can be defined by the network policy",
            type: "string",
            enum: ["ACTIVE", "COMPLETE", "CANCELLED"],
          },
          type: {
            description:
              "This is used to indicate the type of order being created to BPPs. Sometimes orders can be linked to previous orders, like a replacement order in a retail domain. A follow-up consultation in healthcare domain. A single order part of a subscription order. The list of order types can be standardized at the network level.",
            type: "string",
            default: "DEFAULT",
            enum: ["DRAFT", "DEFAULT"],
          },
          provider: {
            description:
              "Details of the provider whose catalog items have been selected.",
            allOf: [{ $ref: "#/components/schemas/Provider" }],
          },
          items: {
            description: "The items purchased / availed in this order",
            type: "array",
            items: { $ref: "#/components/schemas/Item" },
          },
          add_ons: {
            description: "The add-ons purchased / availed in this order",
            type: "array",
            items: { $ref: "#/components/schemas/AddOn" },
          },
          offers: {
            description: "The offers applied in this order",
            type: "array",
            items: { $ref: "#/components/schemas/Offer" },
          },
          billing: {
            description: "The billing details of this order",
            allOf: [{ $ref: "#/components/schemas/Billing" }],
          },
          fulfillments: {
            description: "The fulfillments involved in completing this order",
            type: "array",
            items: { $ref: "#/components/schemas/Fulfillment" },
          },
          cancellation: {
            description: "The cancellation details of this order",
            allOf: [{ $ref: "#/components/schemas/Cancellation" }],
          },
          cancellation_terms: {
            description: "Cancellation terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/CancellationTerm" },
          },
          refund_terms: {
            description: "Refund terms of this item",
            type: "array",
            items: {
              $ref: "#/components/schemas/Item/properties/refund_terms/items",
            },
          },
          replacement_terms: {
            description: "Replacement terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/ReplacementTerm" },
          },
          return_terms: {
            description: "Return terms of this item",
            type: "array",
            items: { $ref: "#/components/schemas/ReturnTerm" },
          },
          quote: {
            description: "The mutually agreed upon quotation for this order.",
            allOf: [{ $ref: "#/components/schemas/Quotation" }],
          },
          payments: {
            description: "The terms of settlement for this order",
            type: "array",
            items: { $ref: "#/components/schemas/Payment" },
          },
          created_at: {
            description: "The date-time of creation of this order",
            type: "string",
            format: "date-time",
          },
          updated_at: {
            description: "The date-time of updated of this order",
            type: "string",
            format: "date-time",
          },
          xinput: {
            description:
              "Additional input required from the customer to confirm this order",
            allOf: [{ $ref: "#/components/schemas/XInput" }],
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Organization: {
        description: "An organization. Usually a recognized business entity.",
        type: "object",
        properties: {
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          address: {
            description: "The postal address of the organization",
            allOf: [{ $ref: "#/components/schemas/Address" }],
          },
          state: {
            description:
              "The state where the organization's address is registered",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          city: {
            description:
              "The city where the the organization's address is registered",
            allOf: [{ $ref: "#/components/schemas/City" }],
          },
          contact: { $ref: "#/components/schemas/Contact" },
        },
      },
      Payment: {
        description:
          "Describes the terms of settlement between the BAP and the BPP for a single transaction. When instantiated, this object contains <ol><li>the amount that has to be settled,</li><li>The payment destination destination details</li><li>When the settlement should happen, and</li><li>A transaction reference ID</li></ol>. During a transaction, the BPP reserves the right to decide the terms of payment. However, the BAP can send its terms to the BPP first. If the BPP does not agree to those terms, it must overwrite the terms and return them to the BAP. If overridden, the BAP must either agree to the terms sent by the BPP in order to preserve the provider's autonomy, or abort the transaction. In case of such disagreements, the BAP and the BPP can perform offline negotiations on the payment terms. Once an agreement is reached, the BAP and BPP can resume transactions.",
        type: "object",
        properties: {
          id: {
            description:
              "ID of the payment term that can be referred at an item or an order level in a catalog",
            type: "string",
          },
          collected_by: {
            description:
              "This field indicates who is the collector of payment. The BAP can set this value to 'bap' if it wants to collect the payment first and  settle it to the BPP. If the BPP agrees to those terms, the BPP should not send the payment url. Alternatively, the BPP can set this field with the value 'bpp' if it wants the payment to be made directly.",
          },
          url: {
            type: "string",
            description:
              "A payment url to be called by the BAP. If empty, then the payment is to be done offline. The details of payment should be present in the params object. If tl_method = http/get, then the payment details will be sent as url params. Two url param values, ```$transaction_id``` and ```$amount``` are mandatory.",
            format: "uri",
          },
          params: {
            type: "object",
            properties: {
              transaction_id: {
                type: "string",
                description:
                  "The reference transaction ID associated with a payment activity",
              },
              amount: { type: "string" },
              currency: { type: "string" },
              bank_code: { type: "string" },
              bank_account_number: { type: "string" },
              virtual_payment_address: { type: "string" },
              source_bank_code: { type: "string" },
              source_bank_account_number: { type: "string" },
              source_virtual_payment_address: { type: "string" },
            },
          },
          type: {
            type: "string",
            enum: [
              "PRE-ORDER",
              "PRE-FULFILLMENT",
              "ON-FULFILLMENT",
              "POST-FULFILLMENT",
            ],
          },
          status: { type: "string", enum: ["PAID", "NOT-PAID"] },
          time: { $ref: "#/components/schemas/Time" },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Person: {
        description: "Describes a person as any individual",
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Describes the identity of the person",
          },
          url: {
            description: "Profile url of the person",
            type: "string",
            format: "uri",
          },
          name: { description: "the name of the person", type: "string" },
          image: { $ref: "#/components/schemas/Image" },
          age: {
            description: "Age of the person",
            allOf: [{ $ref: "#/components/schemas/Duration" }],
          },
          dob: {
            description: "Date of birth of the person",
            type: "string",
            format: "date",
          },
          gender: {
            type: "string",
            description:
              "Gender of something, typically a Person, but possibly also fictional characters, animals, etc. While Male and Female may be used, text strings are also acceptable for people who do not identify as a binary gender.Allowed values for this field can be published in the network policy",
          },
          creds: {
            type: "array",
            items: { $ref: "#/components/schemas/Credential" },
          },
          languages: {
            type: "array",
            items: {
              description: "Describes a language known to the person.",
              type: "object",
              properties: {
                code: { type: "string" },
                name: { type: "string" },
              },
            },
          },
          skills: {
            type: "array",
            items: {
              description: "Describes a skill of the person.",
              type: "object",
              properties: {
                code: { type: "string" },
                name: { type: "string" },
              },
            },
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Price: {
        description: "Describes the price of a product or service",
        type: "object",
        properties: {
          currency: { type: "string" },
          value: { $ref: "#/components/schemas/DecimalValue" },
          estimated_value: { $ref: "#/components/schemas/DecimalValue" },
          computed_value: { $ref: "#/components/schemas/DecimalValue" },
          listed_value: { $ref: "#/components/schemas/DecimalValue" },
          offered_value: { $ref: "#/components/schemas/DecimalValue" },
          minimum_value: { $ref: "#/components/schemas/DecimalValue" },
          maximum_value: { $ref: "#/components/schemas/DecimalValue" },
        },
      },
      Provider: {
        description: "Describes the catalog of a business.",
        type: "object",
        properties: {
          id: { type: "string", description: "Id of the provider" },
          descriptor: { $ref: "#/components/schemas/Descriptor" },
          category_id: {
            type: "string",
            description: "Category Id of the provider at the BPP-level catalog",
          },
          rating: { $ref: "#/components/schemas/Rating/properties/value" },
          time: { $ref: "#/components/schemas/Time" },
          categories: {
            type: "array",
            items: { $ref: "#/components/schemas/Category" },
          },
          fulfillments: {
            type: "array",
            items: { $ref: "#/components/schemas/Fulfillment" },
          },
          payments: {
            type: "array",
            items: { $ref: "#/components/schemas/Payment" },
          },
          locations: {
            type: "array",
            items: { $ref: "#/components/schemas/Location" },
          },
          offers: {
            type: "array",
            items: { $ref: "#/components/schemas/Offer" },
          },
          items: {
            type: "array",
            items: { $ref: "#/components/schemas/Item" },
          },
          exp: {
            type: "string",
            description: "Time after which catalog has to be refreshed",
            format: "date-time",
          },
          rateable: {
            description: "Whether this provider can be rated or not",
            type: "boolean",
          },
          ttl: {
            description:
              "The time-to-live in seconds, for this object. This can be overriden at deeper levels. A value of -1 indicates that this object is not cacheable.",
            type: "integer",
            minimum: -1,
          },
          tags: {
            type: "array",
            items: { $ref: "#/components/schemas/TagGroup" },
          },
        },
      },
      Quotation: {
        description:
          "Describes a quote. It is the estimated price of products or services from the BPP.<br>This has properties like price, breakup, ttl",
        type: "object",
        properties: {
          id: {
            description: "ID of the quote.",
            type: "string",
            format: "uuid",
          },
          price: {
            description: "The total quoted price",
            allOf: [{ $ref: "#/components/schemas/Price" }],
          },
          breakup: {
            description: "the breakup of the total quoted price",
            type: "array",
            items: {
              type: "object",
              properties: {
                item: { $ref: "#/components/schemas/Item" },
                title: { type: "string" },
                price: { $ref: "#/components/schemas/Price" },
              },
            },
          },
          ttl: { $ref: "#/components/schemas/Duration" },
        },
      },
      Rating: {
        description: "Describes the rating of an entity",
        type: "object",
        properties: {
          rating_category: {
            description: "Category of the entity being rated",
            type: "string",
            enum: [
              "Item",
              "Order",
              "Fulfillment",
              "Provider",
              "Agent",
              "Support",
            ],
          },
          id: { description: "Id of the object being rated", type: "string" },
          value: {
            description:
              "Rating value given to the object. This can be a single value or can also contain an inequality operator like gt, gte, lt, lte. This can also contain an inequality expression containing logical operators like && and ||.",
            type: "string",
          },
        },
      },
      Region: {
        description:
          "Describes an arbitrary region of space. The network policy should contain a published list of supported regions by the network.",
        type: "object",
        properties: {
          dimensions: {
            description:
              "The number of dimensions that are used to describe any point inside that region. The most common dimensionality of a region is 2, that represents an area on a map. There are regions on the map that can be approximated to one-dimensional regions like roads, railway lines, or shipping lines. 3 dimensional regions are rarer, but are gaining popularity as flying drones are being adopted for various fulfillment services.",
            type: "string",
            enum: ["1", "2", "3"],
          },
          type: {
            description:
              "The type of region. This is used to specify the granularity of the region represented by this object. Various examples of two-dimensional region types are city, country, state, district, and so on. The network policy should contain a list of all possible region types supported by the network.",
            type: "string",
          },
          name: {
            type: "string",
            description:
              "Name of the region as specified on the map where that region exists.",
          },
          code: {
            type: "string",
            description:
              "A standard code representing the region. This should be interpreted in the same way by all network participants.",
          },
          boundary: {
            type: "string",
            description:
              "A string representing the boundary of the region. One-dimensional regions are represented by polylines. Two-dimensional regions are represented by polygons, and three-dimensional regions can represented by polyhedra.",
          },
          map_url: {
            type: "string",
            description:
              "The url to the map of the region. This can be a globally recognized map or the one specified by the network policy.",
          },
        },
      },
      ReplacementTerm: {
        description: "The replacement policy of an item or an order",
        type: "object",
        properties: {
          fulfillment_state: {
            description:
              "The state of fulfillment during which this term is applicable.",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          replace_within: {
            description:
              "Applicable only for buyer managed returns where the buyer has to replace the item before a certain date-time, failing which they will not be eligible for replacement",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          external_ref: { $ref: "#/components/schemas/MediaFile" },
        },
      },
      ReturnTerm: {
        description: "Describes the return policy of an item or an order",
        type: "object",
        properties: {
          fulfillment_state: {
            description:
              "The state of fulfillment during which this term IETF''s applicable.",
            allOf: [{ $ref: "#/components/schemas/State" }],
          },
          return_eligible: {
            description: "Indicates whether the item is eligible for return",
            type: "boolean",
          },
          return_time: {
            description:
              "Applicable only for buyer managed returns where the buyer has to return the item to the origin before a certain date-time, failing which they will not be eligible for refund.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          return_location: {
            description:
              "The location where the item or order must / will be returned to",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          fulfillment_managed_by: {
            description: "The entity that will perform the return",
            type: "string",
            enum: ["CONSUMER", "PROVIDER"],
          },
        },
      },
      Scalar: {
        description: "Describes a scalar",
        type: "object",
        properties: {
          type: { type: "string", enum: ["CONSTANT", "VARIABLE"] },
          value: { $ref: "#/components/schemas/DecimalValue" },
          estimated_value: { $ref: "#/components/schemas/DecimalValue" },
          computed_value: { $ref: "#/components/schemas/DecimalValue" },
          range: {
            type: "object",
            properties: {
              min: { $ref: "#/components/schemas/DecimalValue" },
              max: { $ref: "#/components/schemas/DecimalValue" },
            },
          },
          unit: { type: "string" },
        },
      },
      Schedule: {
        description:
          "Describes schedule as a repeating time period used to describe a regularly recurring event. At a minimum a schedule will specify frequency which describes the interval between occurrences of the event. Additional information can be provided to specify the schedule more precisely. This includes identifying the timestamps(s) of when the event will take place. Schedules may also have holidays to exclude a specific day from the schedule.<br>This has properties like frequency, holidays, times",
        type: "object",
        properties: {
          frequency: { $ref: "#/components/schemas/Duration" },
          holidays: {
            type: "array",
            items: { type: "string", format: "date-time" },
          },
          times: {
            type: "array",
            items: { type: "string", format: "date-time" },
          },
        },
      },
      State: {
        description:
          "A bounded geopolitical region of governance inside a country.",
        type: "object",
        properties: {
          name: { type: "string", description: "Name of the state" },
          code: {
            type: "string",
            description: "State code as per country or international standards",
          },
        },
      },
      Stop: {
        description:
          "A logical point in space and time during the fulfillment of an order.",
        type: "object",
        properties: {
          id: { type: "string" },
          parent_stop_id: { type: "string" },
          location: {
            description: "Location of the stop",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          type: {
            description:
              "The type of stop. Allowed values of this property can be defined by the network policy.",
            type: "string",
          },
          time: {
            description: "Timings applicable at the stop.",
            allOf: [{ $ref: "#/components/schemas/Time" }],
          },
          instructions: {
            description: "Instructions that need to be followed at the stop",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          contact: {
            description: "Contact details of the stop",
            allOf: [{ $ref: "#/components/schemas/Contact" }],
          },
          person: {
            description: "The details of the person present at the stop",
            allOf: [{ $ref: "#/components/schemas/Person" }],
          },
          authorization: { $ref: "#/components/schemas/Authorization" },
        },
      },
      Support: {
        description: "Details of customer support",
        type: "object",
        properties: {
          ref_id: { type: "string" },
          callback_phone: { type: "string", format: "phone" },
          phone: { type: "string", format: "phone" },
          email: { type: "string", format: "email" },
          url: { type: "string", format: "uri" },
        },
      },
      Tag: {
        description:
          "Describes a tag. This is used to contain extended metadata. This object can be added as a property to any schema to describe extended attributes. For BAPs, tags can be sent during search to optimize and filter search results. BPPs can use tags to index their catalog to allow better search functionality. Tags are sent by the BPP as part of the catalog response in the `on_search` callback. Tags are also meant for display purposes. Upon receiving a tag, BAPs are meant to render them as name-value pairs. This is particularly useful when rendering tabular information about a product or service.",
        type: "object",
        properties: {
          descriptor: {
            description:
              "Description of the Tag, can be used to store detailed information.",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          value: {
            description:
              "The value of the tag. This set by the BPP and rendered as-is by the BAP.",
            type: "string",
          },
          display: {
            description:
              "This value indicates if the tag is intended for display purposes. If set to `true`, then this tag must be displayed. If it is set to `false`, it should not be displayed. This value can override the group display value.",
            type: "boolean",
          },
        },
      },
      TagGroup: {
        description:
          "A collection of tag objects with group level attributes. For detailed documentation on the Tags and Tag Groups schema go to https://github.com/beckn/protocol-specifications/discussions/316",
        type: "object",
        properties: {
          display: {
            description:
              "Indicates the display properties of the tag group. If display is set to false, then the group will not be displayed. If it is set to true, it should be displayed. However, group-level display properties can be overriden by individual tag-level display property. As this schema is purely for catalog display purposes, it is not recommended to send this value during search.",
            type: "boolean",
            default: true,
          },
          descriptor: {
            description:
              "Description of the TagGroup, can be used to store detailed information.",
            allOf: [{ $ref: "#/components/schemas/Descriptor" }],
          },
          list: {
            description:
              "An array of Tag objects listed under this group. This property can be set by BAPs during search to narrow the `search` and achieve more relevant results. When received during `on_search`, BAPs must render this list under the heading described by the `name` property of this schema.",
            type: "array",
            items: { $ref: "#/components/schemas/Tag" },
          },
        },
      },
      Time: {
        description:
          "Describes time in its various forms. It can be a single point in time; duration; or a structured timetable of operations<br>This has properties like label, time stamp,duration,range, days, schedule",
        type: "object",
        properties: {
          label: { type: "string" },
          timestamp: { type: "string", format: "date-time" },
          duration: { $ref: "#/components/schemas/Duration" },
          range: {
            type: "object",
            properties: {
              start: { type: "string", format: "date-time" },
              end: { type: "string", format: "date-time" },
            },
          },
          days: {
            type: "string",
            description: "comma separated values representing days of the week",
          },
          schedule: { $ref: "#/components/schemas/Schedule" },
        },
      },
      Tracking: {
        description:
          "Contains tracking information that can be used by the BAP to track the fulfillment of an order in real-time. which is useful for knowing the location of time sensitive deliveries.",
        type: "object",
        properties: {
          id: {
            description: "A unique tracking reference number",
            type: "string",
          },
          url: {
            description:
              "A URL to the tracking endpoint. This can be a link to a tracking webpage, a webhook URL created by the BAP where BPP can push the tracking data, or a GET url creaed by the BPP which the BAP can poll to get the tracking data. It can also be a websocket URL where the BPP can push real-time tracking data.",
            type: "string",
            format: "uri",
          },
          location: {
            description:
              "In case there is no real-time tracking endpoint available, this field will contain the latest location of the entity being tracked. The BPP will update this value everytime the BAP calls the track API.",
            allOf: [{ $ref: "#/components/schemas/Location" }],
          },
          status: {
            description:
              "This value indicates if the tracking is currently active or not. If this value is `active`, then the BAP can begin tracking the order. If this value is `inactive`, the tracking URL is considered to be expired and the BAP should stop tracking the order.",
            type: "string",
            enum: ["active", "inactive"],
          },
        },
      },
      Vehicle: {
        description:
          "Describes a vehicle is a device that is designed or used to transport people or cargo over land, water, air, or through space.<br>This has properties like category, capacity, make, model, size,variant,color,energy_type,registration",
        type: "object",
        properties: {
          category: { type: "string" },
          capacity: { type: "integer" },
          make: { type: "string" },
          model: { type: "string" },
          size: { type: "string" },
          variant: { type: "string" },
          color: { type: "string" },
          energy_type: { type: "string" },
          registration: { type: "string" },
          wheels_count: { type: "string" },
          cargo_volumne: { type: "string" },
          wheelchair_access: { type: "string" },
          code: { type: "string" },
          emission_standard: { type: "string" },
        },
      },
      XInput: {
        description:
          "Contains any additional or extended inputs required to confirm an order. This is typically a Form Input. Sometimes, selection of catalog elements is not enough for the BPP to confirm an order. For example, to confirm a flight ticket, the airline requires details of the passengers along with information on baggage, identity, in addition to the class of ticket. Similarly, a logistics company may require details on the nature of shipment in order to confirm the shipping. A recruiting firm may require additional details on the applicant in order to confirm a job application. For all such purposes, the BPP can choose to send this object attached to any object in the catalog that is required to be sent while placing the order. This object can typically be sent at an item level or at the order level. The item level XInput will override the Order level XInput as it indicates a special requirement of information for that particular item. Hence the BAP must render a separate form for the Item and another form at the Order level before confirmation.",
        type: "object",
        properties: {
          form: { $ref: "#/components/schemas/Form" },
          required: {
            description:
              "Indicates whether the form data is mandatorily required by the BPP to confirm the order.",
            type: "boolean",
          },
        },
      },
    },
  },
  "x-enum": {
    search: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        intent: {
          fulfillment: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    on_search: {
      message: {
        catalog: {
          providers: {
            items: {
              category_ids: {
                category_ids: [
                  {
                    code: "RET10-1000",
                    description: "Diapers & Wipes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1001",
                    description: "Baby Food & Formula",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1002",
                    description: "Baby Bath & Hygiene",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1003",
                    description: "Bread & Buns",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1004",
                    description: "Bakery Snacks",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1005",
                    description: "Cakes & Pastries",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1006",
                    description: "Dairy Products",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1007",
                    description: "Ice Creams & Desserts",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1008",
                    description: "Plant Based Alternatives",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1009",
                    description: "Oral Care",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-100A",
                    description: "Fragrances & Deodorants",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-100B",
                    description: "Hair Care",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-100C",
                    description: "Hair Tools & Accessories",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-100D",
                    description: "Bath & Hand Wash",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-100E",
                    description: "Bathing Accessories",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-100F",
                    description: "Bath Additives",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1010",
                    description: "Feminine Hygiene",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1011",
                    description: "Intimate Wash & Care",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1012",
                    description: "Men's Grooming",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1013",
                    description: "Health & Medicine",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1014",
                    description: "Skin Care",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1015",
                    description: "Cosmetics",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1016",
                    description: "Carbonated Drinks",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1017",
                    description: "Water",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1018",
                    description: "Juices",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1019",
                    description: "Liquid Drink Concentrates",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-101A",
                    description: "Powdered Drink Concentrates",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-101B",
                    description: "Sports & Energy Drinks",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-101C",
                    description: "Health Drinks",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-101D",
                    description: "Cocktail Mixes",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-101E",
                    description: "Coffee",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-101F",
                    description: "Tea",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1020",
                    description: "Detergents & Dishwash",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1021",
                    description: "Disinfectant & Cleaners",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1022",
                    description: "Garbage & Disposable bags",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1023",
                    description: "Cleaning Tools",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1024",
                    description: "Car & Shoe Care",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1025",
                    description: "Pest Control & Repellents",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1026",
                    description: "Tissue Paper & Napkins",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1027",
                    description: "Bins & Bathroom Ware",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1028",
                    description: "Pooja Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1029",
                    description: "Air Fresheners",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-102A",
                    description: "Eggs",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-102B",
                    description: "Animal Meat",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-102C",
                    description: "Plant Based Meat",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-102D",
                    description: "Fish",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-102E",
                    description: "Plant Based Fish",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-102F",
                    description: "Ready To Cook",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1030",
                    description: "Flour & Grains",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1031",
                    description: "Rice",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1032",
                    description: "Dals & Pulses",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1033",
                    description: "Vegetables",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1034",
                    description: "Fruits",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1035",
                    description: "Sprouts",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1036",
                    description: "Oils & Vinegar",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1037",
                    description: "Dairy & Cheese",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1038",
                    description: "Dry Fruits & Nuts",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1039",
                    description: "Pasta, Soup,Noodles & Vermicilli",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-103A",
                    description: "Cereals & Breakfast",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-103B",
                    description: "Sauces, Spreads & Dips",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-103C",
                    description: "Cooking & Baking Needs",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-103D",
                    description: "Tinned & Processed Food",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-103E",
                    description: "Utensils & Cookware",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-103F",
                    description: "Kitchen Tools & Accessories",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1040",
                    description: "Spices & Masala",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1041",
                    description: "Salt & Sugar",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1042",
                    description: "Oils",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1043",
                    description: "Ghee",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1044",
                    description: "Frozen Snacks",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1045",
                    description: "Biscuits & Cookies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1046",
                    description: "Snacks & Namkeen",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1047",
                    description: "Chocolates & Candies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1048",
                    description: "Pickles & Chutney",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1049",
                    description: "Indian Sweets",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-104A",
                    description: "Ready To Cook & Eat",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-104B",
                    description: "Cooking Essentials",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-104C",
                    description: "Others",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-104D",
                    description: "Art & Craft Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-104E",
                    description: "Bags & Backpacks",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-104F",
                    description: "Calculators",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1050",
                    description: "Colors & Paints",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1051",
                    description: "Lab Equipment",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1052",
                    description: "Painting Accessories",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1053",
                    description: "Pens & Markers",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1054",
                    description: "Posters, Gifts & Greeting Cards",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1055",
                    description: "School Bags & Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1056",
                    description: "Other Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1057",
                    description: "Bird Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1058",
                    description: "Cat Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-1059",
                    description: "Dog Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-105A",
                    description: "Fish Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-105B",
                    description: "Pet Grooming Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-105C",
                    description: "Other Supplies",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-105D",
                    description: "Pet Biometric Monitors",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-105E",
                    description: "Pet Training Aids",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                  {
                    code: "RET10-105F",
                    description: "Other Equipment",
                    reference: "<PR/Issue/Discussion Links md format text>",
                  },
                ],
              },
            },
          },
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
          offers: {
            descriptor: {
              code: [
                {
                  code: "Disc_Pct",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Disc_Amt",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "BuyXGetY",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Freebie",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    select: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    on_select: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    init: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    on_init: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    confirm: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    on_confirm: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    status: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
    },
    on_status: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    cancel: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
    },
    on_cancel: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
      message: {
        order: {
          status: "./orderstatus.yaml",
          fulfillments: {
            fulfillments: {
              type: [
                {
                  code: "Delivery",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "Self-Pickup",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          },
        },
      },
    },
    track: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
    },
    on_track: {
      context: {
        context: {
          domain: [
            {
              code: "ONDC:RET10",
              description: "Grocery",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET11",
              description: "F&B",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET12",
              description: "Fashion",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET13",
              description: "BPC",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET14",
              description: "Electronics",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET15",
              description: "Appliances",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET16",
              description: "Home & Decor",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET17",
              description: "Toys & Games",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET18",
              description: "Health & Wellness",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "ONDC:RET19",
              description: "Pharma",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      },
    },
  },
  "x-tags": {
    intent: {
      tags: [
        {
          code: "BAP_TERMS",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "FINDER_FEE_AMOUNT",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "FINDER_FEE_TYPE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
        {
          code: "BUYER_ID",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "BUYER_ID_CODE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "BUYER_ID_NO",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      ],
    },
    providers: {
      tags: [
        {
          code: "SERVICEABILITY",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "LOCATION",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "CATEGORY",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "TYPE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
              value: [
                {
                  code: 10,
                  description: "Hyperlocal",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: 11,
                  description: "Intercity",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: 12,
                  description: "Pan-India",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
            {
              code: "VAL",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "UNIT",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
              value: [
                {
                  code: "km",
                  description: "If type is 10 - Hyperlocal",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "pincode",
                  description: "If type is 11 - Intercity",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "country",
                  description: "If type is 12 - Pan-India",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          ],
        },
        {
          code: "SELLER_TERMS",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "GST_CREDIT_INVOICE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
              value: [
                {
                  code: "Y",
                  description: "GST credit invoice available",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "N",
                  description: "GST credit invoice not available",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
          ],
        },
        {
          code: "SELLER_ID",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "SELLER_ID_CODE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "SELLER_ID_NO",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      ],
    },
    catalog: {
      items: {
        tags: [
          {
            code: "VARIANT",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: [
              {
                code: "VARIANT_GROUP_ID",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "VARIANT_ATTR",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          {
            code: "IMAGE",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: [
              {
                code: "TYPE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "URL",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          {
            code: "ATTRIBUTE",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: [
              {
                code: "BRAND",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "COLOUR",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "SIZE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "GENDER",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "PATTERN",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "MATERIAL",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "OCCASION",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "SEASON",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "TREND",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "FEATURES",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "MATERIAL_FINISH",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "SIZE_CHART",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "CONCERN",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "INGREDIENT",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "CONSCIOUS",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "PREFERENCE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "FORMULATION",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "SKIN_TYPE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "STYLE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "MODEL",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "SCREEN_SIZE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "MEMORY",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "CPU",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "CPU_MFR",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "STORAGE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "OS",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "INCLUDES",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "FORM_FACTOR",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "COMPATIBLE_DEVICES",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "CONNECTIVITY",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "TYPE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "SPECIAL_FEATURE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "DISPLAY",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "REFRESH",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          {
            code: "G2",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: [
              {
                code: "TIME_TO_SHIP",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "TAX_RATE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          {
            code: "G3",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: [
              {
                code: "BRAND",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "PACK_SIZE",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "NUM_PRICE_SLABS",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
          {
            code: "PRICE_SLAB",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: null,
          },
        ],
      },
    },
    order: {
      items: {
        tags: [
          {
            code: "BUYER_TERMS",
            description: "Description about the tags",
            reference: "<PR/Issue/Discussion Links md format text>",
            list: [
              {
                code: "ITEM_REQ",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
              {
                code: "PACKAGING_REQ",
                description: "Description about the tags",
                reference: "<PR/Issue/Discussion Links md format text>",
              },
            ],
          },
        ],
      },
      tags: [
        {
          code: "BUYER_ID",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "BUYER_ID_CODE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "BUYER_ID_NO",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
        {
          code: "COMM_CHANNEL",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "CHAT_URL",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      ],
    },
    fulfillments: {
      tags: [
        {
          code: "ITEM_DETAILS",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "ITEM_ID",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "COUNT",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "MEASURE_UNIT",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
            {
              code: "MEASURE_VALUE",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
        {
          code: "DELIVERY_TERMS",
          description: "Description about the tags",
          reference: "<PR/Issue/Discussion Links md format text>",
          list: [
            {
              code: "INCOTERMS",
              description: "Description about the tags",
              reference: "<PR/Issue/Discussion Links md format text>",
              value: [
                {
                  code: "CIF",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "EXW",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "FOB",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "DAP",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
                {
                  code: "DDP",
                  description: "about the enum",
                  reference: "<PR/Issue/Discussion Links md format text>",
                },
              ],
            },
            {
              code: "NAMED_PLACE_OF_DELIVERY",
              description: "Place of delivery based on the incoterm used.",
              reference: "<PR/Issue/Discussion Links md format text>",
            },
          ],
        },
      ],
    },
  },
  "x-flows": [
    {
      summary: "B2B Domestic",
      description:
        "The following is an illustrative flow to perform a transaction of a nature where a buyer would like to order bulk items",
      reference: "if any",
      steps: [
        {
          summary: "Search based on the category",
          api: "search",
          description: "Search intent sent by the buyer based on the category",
          reference: "if any",
          example: {
            summary: "search_by_category",
            description: "Search By Category",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:00.000Z",
                ttl: "PT30S",
              },
              message: {
                intent: {
                  item: { category: { id: "RET10-*" } },
                  fulfillment: {
                    type: "Delivery",
                    stops: [
                      {
                        type: "end",
                        location: {
                          gps: "12.974002,77.613458",
                          area_code: "560001",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "12.944002,77.603458",
                          area_code: "560004",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "12.904002,77.593458",
                          area_code: "560076",
                        },
                      },
                    ],
                  },
                  payment: { type: "ON-FULFILLMENT" },
                  tags: [
                    {
                      descriptor: { code: "bap_terms" },
                      list: [
                        {
                          descriptor: { code: "finder_fee_type" },
                          value: "percent",
                        },
                        {
                          descriptor: { code: "finder_fee_amount" },
                          value: "10",
                        },
                      ],
                    },
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Returns item/ catalog",
          api: "on_search",
          description: "Catalog provided by the Seller App",
          reference: "if any",
          example: {
            summary: "Return the catalog for grocery",
            description: "Return the catalog for grocery products",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                catalog: {
                  fulfillments: [
                    { id: "1", type: "Delivery" },
                    { id: "2", type: "Self-Pickup" },
                  ],
                  payments: [
                    { id: "1", type: "PRE-FULFILLMENT" },
                    { id: "2", type: "ON-FULFILLMENT" },
                    { id: "3", type: "POST-FULFILLMENT" },
                  ],
                  descriptor: {
                    name: "ABC store",
                    short_desc: "Online eCommerce Store",
                    long_desc: "Online eCommerce Store",
                    images: [{ url: "https://abc.com/images/1-shop-img" }],
                  },
                  providers: [
                    {
                      id: "P1",
                      descriptor: {
                        name: "ABC store",
                        code: "P001",
                        short_desc: "ABC store",
                        long_desc: "ABC store",
                        additional_desc: {
                          url: "chat link",
                          content_type: "text/html",
                        },
                        images: [{ url: "https://abc.com/images/1-shop-img" }],
                      },
                      rating: "4.4",
                      ttl: "PT1D",
                      locations: [
                        {
                          id: "L1",
                          gps: "12.967555,77.749666",
                          address: "Jayanagar 4th Block",
                          city: { code: "std:080", name: "Bengaluru" },
                          state: { code: "KA" },
                          country: { code: "IND" },
                          area_code: "560076",
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "serviceability" },
                          list: [
                            { descriptor: { code: "location" }, value: "L1" },
                            {
                              descriptor: { code: "category" },
                              value: "RET10-1042",
                            },
                            { descriptor: { code: "type" }, value: "12" },
                            { descriptor: { code: "val" }, value: "IND" },
                            { descriptor: { code: "unit" }, value: "country" },
                          ],
                        },
                        {
                          descriptor: { code: "seller_terms" },
                          list: [
                            {
                              descriptor: { code: "gst_credit_invoice" },
                              value: "Y",
                            },
                          ],
                        },
                        {
                          descriptor: { code: "seller_id" },
                          list: [
                            {
                              descriptor: { code: "seller_id_code" },
                              value: "gst",
                            },
                            {
                              descriptor: { code: "seller_id_no" },
                              value: "xxxxxxxxxxxxxxx",
                            },
                          ],
                        },
                      ],
                      categories: [
                        {
                          id: "V1",
                          descriptor: { name: "Variant Group 1" },
                          tags: [
                            {
                              descriptor: { code: "type" },
                              list: [
                                {
                                  descriptor: { code: "type" },
                                  value: "variant_group",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "attr" },
                              list: [
                                {
                                  descriptor: { code: "name" },
                                  value: "item.tags.attribute.colour",
                                },
                                { descriptor: { code: "seq" }, value: "1" },
                              ],
                            },
                            {
                              descriptor: { code: "attr" },
                              list: [
                                {
                                  descriptor: { code: "name" },
                                  value: "item.tags.attribute.size",
                                },
                                { descriptor: { code: "seq" }, value: "2" },
                              ],
                            },
                          ],
                        },
                      ],
                      items: [
                        {
                          id: "I1",
                          parent_item_id: "V1",
                          descriptor: {
                            name: "Dhara Mustard Oil",
                            code: "UPC / EAN code",
                            short_desc: "Dhara refined mustard oil",
                            long_desc: "Dhara refined mustard oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                            media: [
                              { mimetype: "video/mp4", url: "video_url" },
                            ],
                          },
                          creator: {
                            descriptor: {
                              name: "Mother Dairy",
                              contact: {
                                name: "Raj Kumar",
                                address: {
                                  full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                },
                                phone: "18001801018",
                                email: "consumer.services@motherdairy.com",
                              },
                            },
                          },
                          price: {
                            currency: "INR",
                            value: "300.00",
                            offered_value: "250.00",
                            maximum_value: "350.00",
                          },
                          quantity: {
                            unitized: {
                              measure: { unit: "millilitre", value: "500" },
                            },
                            available: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "2000",
                            },
                            maximum: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "4000",
                            },
                          },
                          category_ids: ["RET10-1042"],
                          fulfillment_ids: ["1"],
                          location_ids: ["L1"],
                          payment_ids: ["2"],
                          "add-ons": [
                            {
                              id: "78787723",
                              descriptor: {
                                name: "Dhara Sunflower Oil",
                                short_desc: "Dhara Sunflower Oil",
                                long_desc: "Dhara Sunflower Oil",
                                images: [
                                  { url: "https://abc.com/images/208.png" },
                                ],
                              },
                              price: {
                                currency: "INR",
                                value: "170.0",
                                offered_value: "100.0",
                                maximum_value: "170.0",
                              },
                            },
                          ],
                          cancellation_terms: [
                            {
                              fulfillment_state: {
                                descriptor: { code: "Pending" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Packed" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Order-delivered" },
                              },
                              return_policy: {
                                return_eligible: "true",
                                return_within: "P7D",
                                fulfillment_managed_by: "seller",
                                return_location: {
                                  address: "RTO address",
                                  gps: "12.667555,77.349666",
                                },
                              },
                            },
                          ],
                          replacement_terms: [{ replace_within: "P7D" }],
                          time: {
                            label: "validity",
                            range: {
                              start: "2022-12-24T00:00:00.000Z",
                              end: "2022-12-31T00:00:00.000Z",
                            },
                          },
                          matched: "true",
                          recommended: "true",
                          tags: [
                            {
                              descriptor: { code: "origin" },
                              list: [
                                {
                                  descriptor: { code: "country" },
                                  value: "IND",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "image" },
                              list: [
                                {
                                  descriptor: { code: "type" },
                                  value: "back_image",
                                },
                                {
                                  descriptor: { code: "url" },
                                  value:
                                    "https://sellerNP.com/images/i1_back_image.png",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "veg_nonveg" },
                              list: [
                                { descriptor: { code: "veg" }, value: "yes" },
                              ],
                            },
                            {
                              descriptor: { code: "g2" },
                              list: [
                                {
                                  descriptor: { code: "time_to_ship" },
                                  value: "P1D",
                                },
                                {
                                  descriptor: { code: "tax_rate" },
                                  value: "12",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "g3" },
                              list: [
                                {
                                  descriptor: { code: "brand" },
                                  value: "Dhara",
                                },
                                {
                                  descriptor: { code: "pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "num_price_slabs" },
                                  value: "3",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "1",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "4",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "250",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "9",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "200",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "10",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "175",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "FSSAI_LICENSE_NO" },
                              list: [
                                {
                                  descriptor: { code: "BRAND_OWNER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "OTHER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "IMPORTER" },
                                  value: "12345678901234",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      offers: [
                        {
                          id: "offer-1",
                          descriptor: {
                            name: "Dhara Olive Oil",
                            code: "FREEBIE",
                            short_desc: "Dhara Olive Oil",
                            long_desc: "Dhara Olive Oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                          },
                          location_ids: [],
                          category_ids: [],
                          item_ids: [],
                          time: {
                            label: "validity",
                            range: {
                              start: "2023-01-08T00:00:00.000Z",
                              end: "2023-01-15T00:00:00.000Z",
                            },
                          },
                        },
                      ],
                      fulfillments: [
                        {
                          contact: {
                            phone: "9886098860",
                            email: "abc@xyz.com",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Select the item",
          api: "select",
          description: "Buyer selects an item",
          reference: "if any",
          example: {
            summary: "Get quote for specific item",
            description:
              "Get quote for specific item with Buyer and Delivery terms",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      location_ids: ["L1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            area_code: "560001",
                          },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Returns item breakup",
          api: "on_select",
          description: "Seller app provides the quote for the selected items",
          reference: "if any",
          example: {
            summary: "Send quote and breakup",
            description:
              "Send quote and breakup for items selected in select call.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  items: [{ fulfillment_ids: ["F1"], id: "I1" }],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      tracking: false,
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      state: { descriptor: { code: "Serviceable" } },
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: {
                          quantity: {
                            available: { count: "200" },
                            maximum: { count: "200" },
                          },
                          price: { currency: "INR", value: "250" },
                        },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                    ],
                    ttl: "P1D",
                  },
                },
              },
            },
          },
        },
        {
          summary: "Requests for Quotation",
          api: "init",
          description:
            "Buyer requests for quotation for the selected item with all the customizations and the quantity of items required",
          reference: "if any",
          example: {
            summary: "Send buyer and delivery terms for RFQ",
            description: "Send buyer and delivery terms for RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }], ttl: "P1D" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Responds to Quotation",
          api: "on_init",
          description:
            "Seller provides the final quotation and breakup with logistics charges",
          reference: "if any",
          example: {
            summary: "Respond to RFQ",
            description: "Respond to RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  provider_location: { id: "L1" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      "@ondc/org/provider_name": "Loadshare",
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          beneficiary_name: "xxxxx",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer raises PO",
          api: "confirm",
          description:
            "Buyer receives the quotation and once agreed to go ahead with the quotation received, creates a PO and sends the PO",
          reference: "if any",
          example: {
            summary: "Raise PO",
            description:
              "PO raised by buyer based on the RFQ response received.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Created",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                          customer: { person: { name: "Ramu" } },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:30:00.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller Accepts PO",
          api: "on_confirm",
          description:
            "Seller app sends an on_confirm call to the buyer app relaying the PO acceptance.",
          reference: "if any",
          example: {
            summary: "Accept PO",
            description: "PO acceptance by Seller",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: {
                    id: "P1",
                    locations: [{ id: "L1" }],
                    rateable: true,
                  },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:31:30.000Z",
                },
              },
            },
          },
        },
      ],
    },
    {
      summary: "B2B Exports",
      description:
        "The following is an illustrative flow to perform a transaction of a nature where a buyer would like to order bulk items",
      reference: "if any",
      steps: [
        {
          summary: "Search for an item",
          api: "search",
          description: "Buyer outside India searches for a product",
          reference: "if any",
          example: {
            summary: "search_by_item",
            description: "Search By Item",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:00.000Z",
                ttl: "PT30S",
              },
              message: {
                intent: {
                  item: { descriptor: { name: "oil" } },
                  fulfillment: {
                    type: "Delivery",
                    stops: [
                      {
                        type: "end",
                        location: {
                          gps: "1.3806217468119772, 103.74636438437074",
                          area_code: "680230",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3813081446741677, 103.74788789072721",
                          area_code: "680207",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3826059101531494, 103.743617819222",
                          area_code: "680354",
                        },
                      },
                    ],
                  },
                  payment: { type: "ON-FULFILLMENT" },
                  tags: [
                    {
                      descriptor: { code: "bap_terms" },
                      list: [
                        {
                          descriptor: { code: "finder_fee_type" },
                          value: "percent",
                        },
                        {
                          descriptor: { code: "finder_fee_amount" },
                          value: "0",
                        },
                      ],
                    },
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  intent: {
                    item: { descriptor: { name: "oil" } },
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            area_code: "680230",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3813081446741677, 103.74788789072721",
                            area_code: "680207",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3826059101531494, 103.743617819222",
                            area_code: "680354",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        code: "bap_terms",
                        list: [
                          { code: "finder_fee_type", value: "percent" },
                          { code: "finder_fee_amount", value: "0" },
                        ],
                      },
                      {
                        code: "buyer_id",
                        list: [
                          { code: "buyer_id_code", value: "gst" },
                          { code: "buyer_id_no", value: "xxxxxxxxxxxxxxx" },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "Returns item/ catalog",
          api: "on_search",
          description: "Seller responds with catalog + communication channel",
          reference: "if any",
          example: {
            summary: "Return the catalog",
            description: "Return the catalog",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                catalog: {
                  fulfillments: [
                    { id: "1", type: "Delivery" },
                    { id: "2", type: "Self-Pickup" },
                  ],
                  payments: [
                    { id: "1", type: "PRE-FULFILLMENT" },
                    { id: "2", type: "ON-FULFILLMENT" },
                    { id: "3", type: "POST-FULFILLMENT" },
                  ],
                  descriptor: {
                    name: "ABC store",
                    short_desc: "Online eCommerce Store",
                    long_desc: "Online eCommerce Store",
                    images: [{ url: "https://abc.com/images/1-shop-img" }],
                  },
                  providers: [
                    {
                      id: "P1",
                      descriptor: {
                        name: "ABC store",
                        code: "P001",
                        short_desc: "ABC store",
                        long_desc: "ABC store",
                        additional_desc: {
                          url: "chat link",
                          content_type: "text/html",
                        },
                        images: [{ url: "https://abc.com/images/1-shop-img" }],
                      },
                      rating: "4.4",
                      ttl: "PT1D",
                      locations: [
                        {
                          id: "L1",
                          gps: "12.967555,77.749666",
                          address: "Jayanagar 4th Block",
                          city: { code: "std:080", name: "Bengaluru" },
                          state: { code: "KA" },
                          country: { code: "IND" },
                          area_code: "560076",
                        },
                      ],
                      creds: [
                        {
                          id: "ESG-12345678",
                          type: "License",
                          desc: "Export License No. ESG-12345678",
                          url: "https://abcd.cdn.com/images/license-img",
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "serviceability" },
                          list: [
                            { descriptor: { code: "location" }, value: "L1" },
                            {
                              descriptor: { code: "category" },
                              value: "RET10-1042",
                            },
                            { descriptor: { code: "type" }, value: "12" },
                            { descriptor: { code: "val" }, value: "SGP" },
                            { descriptor: { code: "unit" }, value: "country" },
                          ],
                        },
                        {
                          descriptor: { code: "seller_terms" },
                          list: [
                            {
                              descriptor: { code: "gst_credit_invoice" },
                              value: "Y",
                            },
                          ],
                        },
                        {
                          descriptor: { code: "seller_id" },
                          list: [
                            {
                              descriptor: { code: "seller_id_code" },
                              value: "gst",
                            },
                            {
                              descriptor: { code: "seller_id_no" },
                              value: "xxxxxxxxxxxxxxx",
                            },
                          ],
                        },
                      ],
                      items: [
                        {
                          id: "I1",
                          parent_item_id: "PI1",
                          descriptor: {
                            name: "Dhara Mustard Oil",
                            code: "UPC / EAN code",
                            short_desc: "Dhara refined mustard oil",
                            long_desc: "Dhara refined mustard oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                            media: [
                              { mimetype: "video/mp4", url: "video_url" },
                            ],
                          },
                          creator: {
                            descriptor: {
                              name: "Mother Dairy",
                              contact: {
                                name: "Raj Kumar",
                                address: {
                                  full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                },
                                phone: "18001801018",
                                email: "consumer.services@motherdairy.com",
                              },
                            },
                          },
                          price: {
                            currency: "INR",
                            value: "300.00",
                            offered_value: "250.00",
                            maximum_value: "350.00",
                          },
                          quantity: {
                            unitized: {
                              measure: { unit: "millilitre", value: "500" },
                            },
                            available: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "2000",
                            },
                            maximum: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "4000",
                            },
                          },
                          category_ids: ["RET10-1042"],
                          fulfillment_ids: ["1"],
                          location_ids: ["L1"],
                          payment_ids: ["2"],
                          "add-ons": [
                            {
                              id: "78787723",
                              descriptor: {
                                name: "Dhara Sunflower Oil",
                                short_desc: "Dhara Sunflower Oil",
                                long_desc: "Dhara Sunflower Oil",
                                images: [
                                  { url: "https://abc.com/images/208.png" },
                                ],
                              },
                              price: {
                                currency: "INR",
                                value: "170.0",
                                offered_value: "100.0",
                                maximum_value: "170.0",
                              },
                            },
                          ],
                          cancellation_terms: [
                            {
                              fulfillment_state: {
                                descriptor: { code: "Pending" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Packed" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Order-delivered" },
                              },
                              return_policy: {
                                return_eligible: "true",
                                return_within: "P7D",
                                fulfillment_managed_by: "seller",
                                return_location: {
                                  address: "RTO address",
                                  gps: "12.667555,77.349666",
                                },
                              },
                            },
                          ],
                          replacement_terms: [{ replace_within: "P7D" }],
                          time: {
                            label: "validity",
                            range: {
                              start: "2022-12-24T00:00:00.000Z",
                              end: "2022-12-31T00:00:00.000Z",
                            },
                          },
                          matched: "true",
                          recommended: "true",
                          tags: [
                            {
                              descriptor: { code: "origin" },
                              list: [
                                {
                                  descriptor: { code: "country" },
                                  value: "IND",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "image" },
                              list: [
                                {
                                  descriptor: { code: "type" },
                                  value: "back_image",
                                },
                                {
                                  descriptor: { code: "url" },
                                  value:
                                    "https://sellerNP.com/images/i1_back_image.png",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "veg_nonveg" },
                              list: [
                                { descriptor: { code: "veg" }, value: "yes" },
                              ],
                            },
                            {
                              descriptor: { code: "g2" },
                              list: [
                                {
                                  descriptor: { code: "time_to_ship" },
                                  value: "P1D",
                                },
                                {
                                  descriptor: { code: "tax_rate" },
                                  value: "12",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "g3" },
                              list: [
                                {
                                  descriptor: { code: "brand" },
                                  value: "Dhara",
                                },
                                {
                                  descriptor: { code: "pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "num_price_slabs" },
                                  value: "3",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "1",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "4",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "250",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "9",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "200",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "10",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "175",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "FSSAI_LICENSE_NO" },
                              list: [
                                {
                                  descriptor: { code: "BRAND_OWNER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "OTHER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "IMPORTER" },
                                  value: "12345678901234",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      offers: [
                        {
                          id: "offer-1",
                          descriptor: {
                            name: "Dhara Olive Oil",
                            code: "FREEBIE",
                            short_desc: "Dhara Olive Oil",
                            long_desc: "Dhara Olive Oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                          },
                          location_ids: [],
                          category_ids: [],
                          item_ids: [],
                          time: {
                            label: "validity",
                            range: {
                              start: "2023-01-08T00:00:00.000Z",
                              end: "2023-01-15T00:00:00.000Z",
                            },
                          },
                        },
                      ],
                      fulfillments: [
                        {
                          contact: {
                            phone: "9886098860",
                            email: "abc@xyz.com",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Select the item",
          api: "select",
          description:
            "Buyer selects an item (Variants/add-ons/offers as required) + Item customization + Delivery terms",
          reference: "if any",
          example: {
            summary: "Get quote for specific item",
            description:
              "Get quote for specific item with Buyer and Delivery terms",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      location_ids: ["L1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            area_code: "680230",
                          },
                        },
                      ],
                      customer: {
                        person: {
                          creds: [
                            {
                              id: "ESG-12345678",
                              type: "License",
                              desc: "Import License No. ESG-12345678",
                              icon: "https://abcd.cdn.com/images/license-img",
                              url: "https://abcd.dnb.com/verify?id=’ESG-12345678'",
                            },
                          ],
                        },
                      },
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Returns item breakup",
          api: "on_select",
          description: "Seller responds with quote breakup",
          reference: "if any",
          example: {
            summary: "Send quote and breakup",
            description:
              "Send quote and breakup for items selected in select call.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  items: [{ fulfillment_ids: ["F1"], id: "I1" }],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      tracking: false,
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      state: { descriptor: { code: "Serviceable" } },
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: {
                          quantity: {
                            available: { count: "200" },
                            maximum: { count: "200" },
                          },
                          price: { currency: "INR", value: "250" },
                        },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                    ],
                    ttl: "P1D",
                  },
                },
              },
            },
          },
        },
        {
          summary: "Requests for Quotation",
          api: "init",
          description: "Buyer Requests for Quotation",
          reference: "if any",
          example: {
            summary: "Send buyer and delivery terms for RFQ",
            description: "Send buyer and delivery terms for RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:999" },
                  country: { code: "IND" },
                },
                action: "init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }], ttl: "P1D" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      customer: {
                        person: {
                          creds: [
                            {
                              id: "ESG-12345678",
                              type: "License",
                              desc: "Import License No. ESG-12345678",
                              icon: "https://abcd.cdn.com/images/license-img",
                              url: "https://abcd.dnb.com/verify?id=’ESG-12345678'",
                            },
                          ],
                        },
                      },
                      tags: [
                        {
                          descriptor: { code: "DELIVERY_TERMS" },
                          list: [
                            { descriptor: { code: "INCOTERMS" }, value: "CIF" },
                            {
                              descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                              value: "SGP",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Responds to Quotation",
          api: "on_init",
          description: "Seller responds with Quotation",
          reference: "if any",
          example: {
            summary: "Respond to RFQ",
            description: "Respond to RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  provider_location: { id: "L1" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      "@ondc/org/provider_name": "Loadshare",
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "DELIVERY_TERMS" },
                          list: [
                            { descriptor: { code: "INCOTERMS" }, value: "CIF" },
                            {
                              descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                              value: "SGP",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          beneficiary_name: "xxxxx",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer raises PO",
          api: "confirm",
          description: "Buyer creates a Purchase Order",
          reference: "if any",
          example: {
            summary: "Raise PO",
            description:
              "PO raised by buyer based on the RFQ response received.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Created",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                          customer: { person: { name: "Ramu" } },
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "DELIVERY_TERMS" },
                          list: [
                            { descriptor: { code: "INCOTERMS" }, value: "CIF" },
                            {
                              descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                              value: "SGP",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:30:00.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller Accepts PO",
          api: "on_confirm",
          description: "Seller accepts Purchase Order",
          reference: "if any",
          example: {
            summary: "Accept PO",
            description: "PO acceptance by Seller",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:999" },
                  country: { code: "IND" },
                },
                action: "on_confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: {
                    id: "P1",
                    locations: [{ id: "L1" }],
                    rateable: true,
                  },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                      tags: [
                        {
                          descriptor: { code: "DELIVERY_TERMS" },
                          list: [
                            { descriptor: { code: "INCOTERMS" }, value: "CIF" },
                            {
                              descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                              value: "SGP",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:31:30.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Consumer platform requests for latest status",
          api: "status",
          description: "Buyer requests for Shipment status",
          reference: "if any",
          example: {
            summary: "Buyer asks for order status",
            description: "Buyer asks for order status",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: { order_id: "O1" },
            },
          },
        },
        {
          summary:
            "Provider platform provides latest order status and sends invoice",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer and sends invoice",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Pending" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [
                    { url: "https://invoice_url", label: "PROFORMA_INVOICE" },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary:
            "Payment details are updated in case BAP collects the payment",
          api: "update",
          description:
            "Payment status is sent (If collected by BAP) + requests for Invoice",
          reference: "if any",
          example: {
            summary: "Buyer updates payment status",
            description: "Buyer updates payment status (CollectedBy BAP)",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "update",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                update_target: "item",
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1" },
                  items: [{ id: "I1", quantity: { selected: { count: 200 } } }],
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "seller updates fulfilments - Multiple fulfillments for Single PO",
          api: "on_update",
          description:
            "seller updates fulfilments - Multiple fulfillments for Single PO",
          reference: "if any",
          example: {
            summary: "Single PO - Multiple Fulfillment",
            description: "Single PO - Multiple Fulfillment",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_update",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1" },
                  items: [
                    {
                      id: "I1",
                      quantity: { selected: { count: 200 } },
                      fulfillment_ids: ["F1", "F2"],
                    },
                  ],
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-07T11:00:00.000Z",
                              end: "2023-02-07T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for drop",
                            short_desc: "Delivery Confirmation Code",
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                      tags: [
                        {
                          descriptor: { code: "ITEM_DETAILS" },
                          list: [
                            { descriptor: { code: "ITEM_ID" }, value: "I1" },
                            { descriptor: { code: "COUNT" }, value: "100" },
                            {
                              descriptor: { code: "MEASURE_UNIT" },
                              value: "millilitre",
                            },
                            {
                              descriptor: { code: "MEASURE_VALUE" },
                              value: "500",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "F2",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-07T11:00:00.000Z",
                              end: "2023-02-07T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for drop",
                            short_desc: "Delivery Confirmation Code",
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                      tags: [
                        {
                          descriptor: { code: "ITEM_DETAILS" },
                          list: [
                            { descriptor: { code: "ITEM_ID" }, value: "I1" },
                            { descriptor: { code: "COUNT" }, value: "100" },
                            {
                              descriptor: { code: "MEASURE_UNIT" },
                              value: "millilitre",
                            },
                            {
                              descriptor: { code: "MEASURE_VALUE" },
                              value: "500",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Provider platform provides latest order status",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is picked up",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-picked-up" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary: "Provider platform provides latest order status",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is out for delivery",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Out-for-delivery" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary: "Provider platform provides latest order status",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer after the order is delivered",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Completed",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-delivered" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                            timestamp: "2023-02-03T11:35:00.000Z",
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [{ url: "https://invoice_url", label: "Invoice" }],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
      ],
    },
    {
      summary: "B2B Multiple Fulfillments",
      description:
        "The following is an illustrative flow to perform a transaction of a nature where a buyer would like to order bulk items",
      reference: "if any",
      steps: [
        {
          summary: "Search for an item",
          api: "search",
          description: "Buyer searches for an item",
          reference: "if any",
          example: {
            summary: "search_by_item",
            description: "Search By Item",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:00.000Z",
                ttl: "PT30S",
              },
              message: {
                intent: {
                  item: { descriptor: { name: "oil" } },
                  fulfillment: {
                    type: "Delivery",
                    stops: [
                      {
                        type: "end",
                        location: {
                          gps: "1.3806217468119772, 103.74636438437074",
                          area_code: "680230",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3813081446741677, 103.74788789072721",
                          area_code: "680207",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3826059101531494, 103.743617819222",
                          area_code: "680354",
                        },
                      },
                    ],
                  },
                  payment: { type: "ON-FULFILLMENT" },
                  tags: [
                    {
                      descriptor: { code: "bap_terms" },
                      list: [
                        {
                          descriptor: { code: "finder_fee_type" },
                          value: "percent",
                        },
                        {
                          descriptor: { code: "finder_fee_amount" },
                          value: "0",
                        },
                      ],
                    },
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  intent: {
                    item: { descriptor: { name: "oil" } },
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            area_code: "680230",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3813081446741677, 103.74788789072721",
                            area_code: "680207",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3826059101531494, 103.743617819222",
                            area_code: "680354",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        code: "bap_terms",
                        list: [
                          { code: "finder_fee_type", value: "percent" },
                          { code: "finder_fee_amount", value: "0" },
                        ],
                      },
                      {
                        code: "buyer_id",
                        list: [
                          { code: "buyer_id_code", value: "gst" },
                          { code: "buyer_id_no", value: "xxxxxxxxxxxxxxx" },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "Returns item/ catalog",
          api: "on_search",
          description: "Seller responds back with the catalog",
          reference: "if any",
          example: {
            summary: "Return the catalog",
            description: "Return the catalog",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                catalog: {
                  fulfillments: [
                    { id: "1", type: "Delivery" },
                    { id: "2", type: "Self-Pickup" },
                  ],
                  payments: [
                    { id: "1", type: "PRE-FULFILLMENT" },
                    { id: "2", type: "ON-FULFILLMENT" },
                    { id: "3", type: "POST-FULFILLMENT" },
                  ],
                  descriptor: {
                    name: "ABC store",
                    short_desc: "Online eCommerce Store",
                    long_desc: "Online eCommerce Store",
                    images: [{ url: "https://abc.com/images/1-shop-img" }],
                  },
                  providers: [
                    {
                      id: "P1",
                      descriptor: {
                        name: "ABC store",
                        code: "P001",
                        short_desc: "ABC store",
                        long_desc: "ABC store",
                        additional_desc: {
                          url: "chat link",
                          content_type: "text/html",
                        },
                        images: [{ url: "https://abc.com/images/1-shop-img" }],
                      },
                      rating: "4.4",
                      ttl: "PT1D",
                      locations: [
                        {
                          id: "L1",
                          gps: "12.967555,77.749666",
                          address: "Jayanagar 4th Block",
                          city: { code: "std:080", name: "Bengaluru" },
                          state: { code: "KA" },
                          country: { code: "IND" },
                          area_code: "560076",
                        },
                      ],
                      creds: [
                        {
                          id: "ESG-12345678",
                          type: "License",
                          desc: "Export License No. ESG-12345678",
                          url: "https://abcd.cdn.com/images/license-img",
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "serviceability" },
                          list: [
                            { descriptor: { code: "location" }, value: "L1" },
                            {
                              descriptor: { code: "category" },
                              value: "RET10-1042",
                            },
                            { descriptor: { code: "type" }, value: "12" },
                            { descriptor: { code: "val" }, value: "SGP" },
                            { descriptor: { code: "unit" }, value: "country" },
                          ],
                        },
                        {
                          descriptor: { code: "seller_terms" },
                          list: [
                            {
                              descriptor: { code: "gst_credit_invoice" },
                              value: "Y",
                            },
                          ],
                        },
                        {
                          descriptor: { code: "seller_id" },
                          list: [
                            {
                              descriptor: { code: "seller_id_code" },
                              value: "gst",
                            },
                            {
                              descriptor: { code: "seller_id_no" },
                              value: "xxxxxxxxxxxxxxx",
                            },
                          ],
                        },
                      ],
                      items: [
                        {
                          id: "I1",
                          parent_item_id: "PI1",
                          descriptor: {
                            name: "Dhara Mustard Oil",
                            code: "UPC / EAN code",
                            short_desc: "Dhara refined mustard oil",
                            long_desc: "Dhara refined mustard oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                            media: [
                              { mimetype: "video/mp4", url: "video_url" },
                            ],
                          },
                          creator: {
                            descriptor: {
                              name: "Mother Dairy",
                              contact: {
                                name: "Raj Kumar",
                                address: {
                                  full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                },
                                phone: "18001801018",
                                email: "consumer.services@motherdairy.com",
                              },
                            },
                          },
                          price: {
                            currency: "INR",
                            value: "300.00",
                            offered_value: "250.00",
                            maximum_value: "350.00",
                          },
                          quantity: {
                            unitized: {
                              measure: { unit: "millilitre", value: "500" },
                            },
                            available: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "2000",
                            },
                            maximum: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "4000",
                            },
                          },
                          category_ids: ["RET10-1042"],
                          fulfillment_ids: ["1"],
                          location_ids: ["L1"],
                          payment_ids: ["2"],
                          "add-ons": [
                            {
                              id: "78787723",
                              descriptor: {
                                name: "Dhara Sunflower Oil",
                                short_desc: "Dhara Sunflower Oil",
                                long_desc: "Dhara Sunflower Oil",
                                images: [
                                  { url: "https://abc.com/images/208.png" },
                                ],
                              },
                              price: {
                                currency: "INR",
                                value: "170.0",
                                offered_value: "100.0",
                                maximum_value: "170.0",
                              },
                            },
                          ],
                          cancellation_terms: [
                            {
                              fulfillment_state: {
                                descriptor: { code: "Pending" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Packed" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Order-delivered" },
                              },
                              return_policy: {
                                return_eligible: "true",
                                return_within: "P7D",
                                fulfillment_managed_by: "seller",
                                return_location: {
                                  address: "RTO address",
                                  gps: "12.667555,77.349666",
                                },
                              },
                            },
                          ],
                          replacement_terms: [{ replace_within: "P7D" }],
                          time: {
                            label: "validity",
                            range: {
                              start: "2022-12-24T00:00:00.000Z",
                              end: "2022-12-31T00:00:00.000Z",
                            },
                          },
                          matched: "true",
                          recommended: "true",
                          tags: [
                            {
                              descriptor: { code: "origin" },
                              list: [
                                {
                                  descriptor: { code: "country" },
                                  value: "IND",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "image" },
                              list: [
                                {
                                  descriptor: { code: "type" },
                                  value: "back_image",
                                },
                                {
                                  descriptor: { code: "url" },
                                  value:
                                    "https://sellerNP.com/images/i1_back_image.png",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "veg_nonveg" },
                              list: [
                                { descriptor: { code: "veg" }, value: "yes" },
                              ],
                            },
                            {
                              descriptor: { code: "g2" },
                              list: [
                                {
                                  descriptor: { code: "time_to_ship" },
                                  value: "P1D",
                                },
                                {
                                  descriptor: { code: "tax_rate" },
                                  value: "12",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "g3" },
                              list: [
                                {
                                  descriptor: { code: "brand" },
                                  value: "Dhara",
                                },
                                {
                                  descriptor: { code: "pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "num_price_slabs" },
                                  value: "3",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "1",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "4",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "250",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "9",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "200",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "10",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "175",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "FSSAI_LICENSE_NO" },
                              list: [
                                {
                                  descriptor: { code: "BRAND_OWNER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "OTHER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "IMPORTER" },
                                  value: "12345678901234",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      offers: [
                        {
                          id: "offer-1",
                          descriptor: {
                            name: "Dhara Olive Oil",
                            code: "FREEBIE",
                            short_desc: "Dhara Olive Oil",
                            long_desc: "Dhara Olive Oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                          },
                          location_ids: [],
                          category_ids: [],
                          item_ids: [],
                          time: {
                            label: "validity",
                            range: {
                              start: "2023-01-08T00:00:00.000Z",
                              end: "2023-01-15T00:00:00.000Z",
                            },
                          },
                        },
                      ],
                      fulfillments: [
                        {
                          contact: {
                            phone: "9886098860",
                            email: "abc@xyz.com",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Select the item",
          api: "select",
          description: "Buyer selects an item",
          reference: "if any",
          example: {
            summary: "Get quote for specific item",
            description:
              "Get quote for specific item with Buyer and Delivery terms",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      location_ids: ["L1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            area_code: "560001",
                          },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Returns item breakup",
          api: "on_select",
          description: "Seller responds with the quote breakup",
          reference: "if any",
          example: {
            summary: "Send quote and breakup",
            description:
              "Send quote and breakup for items selected in select call.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  items: [{ fulfillment_ids: ["F1"], id: "I1" }],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      tracking: false,
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      state: { descriptor: { code: "Serviceable" } },
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: {
                          quantity: {
                            available: { count: "200" },
                            maximum: { count: "200" },
                          },
                          price: { currency: "INR", value: "250" },
                        },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                    ],
                    ttl: "P1D",
                  },
                },
              },
            },
          },
        },
        {
          summary: "Requests for Quotation",
          api: "init",
          description: "Buyer requests for quotation",
          reference: "if any",
          example: {
            summary: "Send buyer and delivery terms for RFQ",
            description: "Send buyer and delivery terms for RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }], ttl: "P1D" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Responds to Quotation",
          api: "on_init",
          description: "Seller provides the final quotation",
          reference: "if any",
          example: {
            summary: "Respond to RFQ",
            description: "Respond to RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  provider_location: { id: "L1" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      "@ondc/org/provider_name": "Loadshare",
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          beneficiary_name: "xxxxx",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer raises PO",
          api: "confirm",
          description: "Buyer creates a Purchase Order",
          reference: "if any",
          example: {
            summary: "Raise PO",
            description:
              "PO raised by buyer based on the RFQ response received.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Created",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                          customer: { person: { name: "Ramu" } },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:30:00.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller Accepts PO",
          api: "on_confirm",
          description: "Seller accepts Purchase Order",
          reference: "if any",
          example: {
            summary: "Accept PO",
            description: "PO acceptance by Seller",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: {
                    id: "P1",
                    locations: [{ id: "L1" }],
                    rateable: true,
                  },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:31:30.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Consumer platform requests for latest status",
          api: "status",
          description: "Buyer requests for Shipment status",
          reference: "if any",
          example: {
            summary: "Buyer asks for order status",
            description: "Buyer asks for order status",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: { order_id: "O1" },
            },
          },
        },
        {
          summary:
            "Provider platform provides latest order status and sends invoice",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Pending" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [
                    { url: "https://invoice_url", label: "PROFORMA_INVOICE" },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary:
            "Payment details are updated in case BAP collects the payment",
          api: "update",
          description:
            "Payment status is sent (If collected by BAP) + requests for Invoice",
          reference: "if any",
          example: {
            summary: "Buyer updates payment status",
            description: "Buyer updates payment status (CollectedBy BAP)",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "update",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                update_target: "item",
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1" },
                  items: [{ id: "I1", quantity: { selected: { count: 200 } } }],
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary:
            "seller updates fulfilments - Multiple fulfillments for Single PO",
          api: "on_update",
          description:
            "seller updates fulfilments - Multiple fulfillments for Single PO",
          reference: "if any",
          example: {
            summary: "Single PO - Multiple Fulfillment",
            description: "Single PO - Multiple Fulfillment",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_update",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1" },
                  items: [
                    {
                      id: "I1",
                      quantity: { selected: { count: 200 } },
                      fulfillment_ids: ["F1", "F2"],
                    },
                  ],
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-07T11:00:00.000Z",
                              end: "2023-02-07T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for drop",
                            short_desc: "Delivery Confirmation Code",
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                      tags: [
                        {
                          descriptor: { code: "ITEM_DETAILS" },
                          list: [
                            { descriptor: { code: "ITEM_ID" }, value: "I1" },
                            { descriptor: { code: "COUNT" }, value: "100" },
                            {
                              descriptor: { code: "MEASURE_UNIT" },
                              value: "millilitre",
                            },
                            {
                              descriptor: { code: "MEASURE_VALUE" },
                              value: "500",
                            },
                          ],
                        },
                      ],
                    },
                    {
                      id: "F2",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-07T11:00:00.000Z",
                              end: "2023-02-07T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for drop",
                            short_desc: "Delivery Confirmation Code",
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                      tags: [
                        {
                          descriptor: { code: "ITEM_DETAILS" },
                          list: [
                            { descriptor: { code: "ITEM_ID" }, value: "I1" },
                            { descriptor: { code: "COUNT" }, value: "100" },
                            {
                              descriptor: { code: "MEASURE_UNIT" },
                              value: "millilitre",
                            },
                            {
                              descriptor: { code: "MEASURE_VALUE" },
                              value: "500",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Provider platform provides latest order status",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once order is picked up",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-picked-up" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary: "Provider platform provides latest order status",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer when the order is out for delivery",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Out-for-delivery" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary: "Provider platform provides latest order status",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer after the order is delivered",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Completed",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-delivered" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                            timestamp: "2023-02-03T11:35:00.000Z",
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [{ url: "https://invoice_url", label: "Invoice" }],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
      ],
    },
    {
      summary: "B2B Prepaid BPP",
      description:
        "The following is an illustrative flow to perform a transaction of a nature where a buyer would like to order bulk items and makes prepaid payment.",
      reference: "if any",
      steps: [
        {
          summary: "Search for an item",
          api: "search",
          description: "Buyer searches for an item",
          reference: "if any",
          example: {
            summary: "search_by_item",
            description: "Search By Item",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:00.000Z",
                ttl: "PT30S",
              },
              message: {
                intent: {
                  item: { descriptor: { name: "oil" } },
                  fulfillment: {
                    type: "Delivery",
                    stops: [
                      {
                        type: "end",
                        location: {
                          gps: "1.3806217468119772, 103.74636438437074",
                          area_code: "680230",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3813081446741677, 103.74788789072721",
                          area_code: "680207",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3826059101531494, 103.743617819222",
                          area_code: "680354",
                        },
                      },
                    ],
                  },
                  payment: { type: "ON-FULFILLMENT" },
                  tags: [
                    {
                      descriptor: { code: "bap_terms" },
                      list: [
                        {
                          descriptor: { code: "finder_fee_type" },
                          value: "percent",
                        },
                        {
                          descriptor: { code: "finder_fee_amount" },
                          value: "0",
                        },
                      ],
                    },
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  intent: {
                    item: { descriptor: { name: "oil" } },
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            area_code: "680230",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3813081446741677, 103.74788789072721",
                            area_code: "680207",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3826059101531494, 103.743617819222",
                            area_code: "680354",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        code: "bap_terms",
                        list: [
                          { code: "finder_fee_type", value: "percent" },
                          { code: "finder_fee_amount", value: "0" },
                        ],
                      },
                      {
                        code: "buyer_id",
                        list: [
                          { code: "buyer_id_code", value: "gst" },
                          { code: "buyer_id_no", value: "xxxxxxxxxxxxxxx" },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "Seller returns item/ catalog with communication channel",
          api: "on_search",
          description: "Seller responds back with the catalog",
          reference: "if any",
          example: {
            summary: "Return the catalog",
            description: "Return the catalog",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                catalog: {
                  fulfillments: [
                    { id: "1", type: "Delivery" },
                    { id: "2", type: "Self-Pickup" },
                  ],
                  payments: [
                    { id: "1", type: "PRE-FULFILLMENT" },
                    { id: "2", type: "ON-FULFILLMENT" },
                    { id: "3", type: "POST-FULFILLMENT" },
                  ],
                  descriptor: {
                    name: "ABC store",
                    short_desc: "Online eCommerce Store",
                    long_desc: "Online eCommerce Store",
                    images: [{ url: "https://abc.com/images/1-shop-img" }],
                  },
                  providers: [
                    {
                      id: "P1",
                      descriptor: {
                        name: "ABC store",
                        code: "P001",
                        short_desc: "ABC store",
                        long_desc: "ABC store",
                        additional_desc: {
                          url: "chat link",
                          content_type: "text/html",
                        },
                        images: [{ url: "https://abc.com/images/1-shop-img" }],
                      },
                      rating: "4.4",
                      ttl: "PT1D",
                      locations: [
                        {
                          id: "L1",
                          gps: "12.967555,77.749666",
                          address: "Jayanagar 4th Block",
                          city: { code: "std:080", name: "Bengaluru" },
                          state: { code: "KA" },
                          country: { code: "IND" },
                          area_code: "560076",
                        },
                      ],
                      creds: [
                        {
                          id: "ESG-12345678",
                          type: "License",
                          desc: "Export License No. ESG-12345678",
                          url: "https://abcd.cdn.com/images/license-img",
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "serviceability" },
                          list: [
                            { descriptor: { code: "location" }, value: "L1" },
                            {
                              descriptor: { code: "category" },
                              value: "RET10-1042",
                            },
                            { descriptor: { code: "type" }, value: "12" },
                            { descriptor: { code: "val" }, value: "SGP" },
                            { descriptor: { code: "unit" }, value: "country" },
                          ],
                        },
                        {
                          descriptor: { code: "seller_terms" },
                          list: [
                            {
                              descriptor: { code: "gst_credit_invoice" },
                              value: "Y",
                            },
                          ],
                        },
                        {
                          descriptor: { code: "seller_id" },
                          list: [
                            {
                              descriptor: { code: "seller_id_code" },
                              value: "gst",
                            },
                            {
                              descriptor: { code: "seller_id_no" },
                              value: "xxxxxxxxxxxxxxx",
                            },
                          ],
                        },
                      ],
                      items: [
                        {
                          id: "I1",
                          parent_item_id: "PI1",
                          descriptor: {
                            name: "Dhara Mustard Oil",
                            code: "UPC / EAN code",
                            short_desc: "Dhara refined mustard oil",
                            long_desc: "Dhara refined mustard oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                            media: [
                              { mimetype: "video/mp4", url: "video_url" },
                            ],
                          },
                          creator: {
                            descriptor: {
                              name: "Mother Dairy",
                              contact: {
                                name: "Raj Kumar",
                                address: {
                                  full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                },
                                phone: "18001801018",
                                email: "consumer.services@motherdairy.com",
                              },
                            },
                          },
                          price: {
                            currency: "INR",
                            value: "300.00",
                            offered_value: "250.00",
                            maximum_value: "350.00",
                          },
                          quantity: {
                            unitized: {
                              measure: { unit: "millilitre", value: "500" },
                            },
                            available: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "2000",
                            },
                            maximum: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "4000",
                            },
                          },
                          category_ids: ["RET10-1042"],
                          fulfillment_ids: ["1"],
                          location_ids: ["L1"],
                          payment_ids: ["2"],
                          "add-ons": [
                            {
                              id: "78787723",
                              descriptor: {
                                name: "Dhara Sunflower Oil",
                                short_desc: "Dhara Sunflower Oil",
                                long_desc: "Dhara Sunflower Oil",
                                images: [
                                  { url: "https://abc.com/images/208.png" },
                                ],
                              },
                              price: {
                                currency: "INR",
                                value: "170.0",
                                offered_value: "100.0",
                                maximum_value: "170.0",
                              },
                            },
                          ],
                          cancellation_terms: [
                            {
                              fulfillment_state: {
                                descriptor: { code: "Pending" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Packed" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Order-delivered" },
                              },
                              return_policy: {
                                return_eligible: "true",
                                return_within: "P7D",
                                fulfillment_managed_by: "seller",
                                return_location: {
                                  address: "RTO address",
                                  gps: "12.667555,77.349666",
                                },
                              },
                            },
                          ],
                          replacement_terms: [{ replace_within: "P7D" }],
                          time: {
                            label: "validity",
                            range: {
                              start: "2022-12-24T00:00:00.000Z",
                              end: "2022-12-31T00:00:00.000Z",
                            },
                          },
                          matched: "true",
                          recommended: "true",
                          tags: [
                            {
                              descriptor: { code: "origin" },
                              list: [
                                {
                                  descriptor: { code: "country" },
                                  value: "IND",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "image" },
                              list: [
                                {
                                  descriptor: { code: "type" },
                                  value: "back_image",
                                },
                                {
                                  descriptor: { code: "url" },
                                  value:
                                    "https://sellerNP.com/images/i1_back_image.png",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "veg_nonveg" },
                              list: [
                                { descriptor: { code: "veg" }, value: "yes" },
                              ],
                            },
                            {
                              descriptor: { code: "g2" },
                              list: [
                                {
                                  descriptor: { code: "time_to_ship" },
                                  value: "P1D",
                                },
                                {
                                  descriptor: { code: "tax_rate" },
                                  value: "12",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "g3" },
                              list: [
                                {
                                  descriptor: { code: "brand" },
                                  value: "Dhara",
                                },
                                {
                                  descriptor: { code: "pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "num_price_slabs" },
                                  value: "3",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "1",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "4",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "250",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "9",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "200",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "10",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "175",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "FSSAI_LICENSE_NO" },
                              list: [
                                {
                                  descriptor: { code: "BRAND_OWNER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "OTHER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "IMPORTER" },
                                  value: "12345678901234",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      offers: [
                        {
                          id: "offer-1",
                          descriptor: {
                            name: "Dhara Olive Oil",
                            code: "FREEBIE",
                            short_desc: "Dhara Olive Oil",
                            long_desc: "Dhara Olive Oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                          },
                          location_ids: [],
                          category_ids: [],
                          item_ids: [],
                          time: {
                            label: "validity",
                            range: {
                              start: "2023-01-08T00:00:00.000Z",
                              end: "2023-01-15T00:00:00.000Z",
                            },
                          },
                        },
                      ],
                      fulfillments: [
                        {
                          contact: {
                            phone: "9886098860",
                            email: "abc@xyz.com",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer selects an item.",
          api: "select",
          description: "Buyer selects an item",
          reference: "if any",
          example: {
            summary: "Get quote for specific item",
            description:
              "Get quote for specific item with Buyer and Delivery terms",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      location_ids: ["L1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            area_code: "560001",
                          },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Seller returns the breakup based on the price listed.",
          api: "on_select",
          description: "Seller responds with the quote breakup",
          reference: "if any",
          example: {
            summary: "Send quote and breakup",
            description:
              "Send quote and breakup for items selected in select call.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  items: [{ fulfillment_ids: ["F1"], id: "I1" }],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      tracking: false,
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      state: { descriptor: { code: "Serviceable" } },
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: {
                          quantity: {
                            available: { count: "200" },
                            maximum: { count: "200" },
                          },
                          price: { currency: "INR", value: "250" },
                        },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                    ],
                    ttl: "P1D",
                  },
                },
              },
            },
          },
        },
        {
          summary: "Buyer Requests for Quotation",
          api: "init",
          description: "Buyer requests for quotation",
          reference: "if any",
          example: {
            summary: "Send buyer and delivery terms for RFQ",
            description: "Send buyer and delivery terms for RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }], ttl: "P1D" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Seller Responds to Quotation with delivery charges",
          api: "on_init",
          description:
            "Seller provides the final quotation with delivery charges",
          reference: "if any",
          example: {
            summary: "Respond to RFQ",
            description: "Respond to RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  provider_location: { id: "L1" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      "@ondc/org/provider_name": "Loadshare",
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          beneficiary_name: "xxxxx",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer raises PO",
          api: "confirm",
          description: "Buyer creates a Purchase Order",
          reference: "if any",
          example: {
            summary: "Raise PO",
            description:
              "PO raised by buyer based on the RFQ response received.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Created",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                          customer: { person: { name: "Ramu" } },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:30:00.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller Accepts PO",
          api: "on_confirm",
          description: "Seller accepts Purchase Order",
          reference: "if any",
          example: {
            summary: "Accept PO",
            description: "PO acceptance by Seller",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: {
                    id: "P1",
                    locations: [{ id: "L1" }],
                    rateable: true,
                  },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:31:30.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller sends proforma invoice.",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Pending" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [
                    { url: "https://invoice_url", label: "PROFORMA_INVOICE" },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary:
            "Payment is collected by seller (Prepaid) and details are updated",
          api: "on_update",
          description: "Provider platform sends the payment details",
          reference: "if any",
          example: {
            summary: "Seller updating the payment status",
            description: "Seller updating the payment status (CollectedBy BPP)",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_update",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1" },
                  items: [{ id: "I1", quantity: { selected: { count: 200 } } }],
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Consumer platform requests for latest status",
          api: "status",
          description: "Buyer requests for Shipment status",
          reference: "if any",
          example: {
            summary: "Buyer asks for order status",
            description: "Buyer asks for order status",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: { order_id: "O1" },
            },
          },
        },
        {
          summary:
            "Provider platform updates the latest status - Order Picked up",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is picked up",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-picked-up" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary:
            "Provider platform updates the latest status - Out for Delivery",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is out for delivery",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Out-for-delivery" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary: "Provider platform updates the latest status - Delivered",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is delivered",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Completed",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-delivered" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                            timestamp: "2023-02-03T11:35:00.000Z",
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [{ url: "https://invoice_url", label: "Invoice" }],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
      ],
    },
    {
      summary: "B2B Prepaid BAP",
      description:
        "The following is an illustrative flow to perform a transaction of a nature where a buyer would like to order bulk items and makes prepaid payment.",
      reference: "if any",
      steps: [
        {
          summary: "Search for an item",
          api: "search",
          description: "Buyer searches for an item",
          reference: "if any",
          example: {
            summary: "search_by_item",
            description: "Search By Item",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:00.000Z",
                ttl: "PT30S",
              },
              message: {
                intent: {
                  item: { descriptor: { name: "oil" } },
                  fulfillment: {
                    type: "Delivery",
                    stops: [
                      {
                        type: "end",
                        location: {
                          gps: "1.3806217468119772, 103.74636438437074",
                          area_code: "680230",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3813081446741677, 103.74788789072721",
                          area_code: "680207",
                        },
                      },
                      {
                        type: "end",
                        location: {
                          gps: "1.3826059101531494, 103.743617819222",
                          area_code: "680354",
                        },
                      },
                    ],
                  },
                  payment: { type: "ON-FULFILLMENT" },
                  tags: [
                    {
                      descriptor: { code: "bap_terms" },
                      list: [
                        {
                          descriptor: { code: "finder_fee_type" },
                          value: "percent",
                        },
                        {
                          descriptor: { code: "finder_fee_amount" },
                          value: "0",
                        },
                      ],
                    },
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  intent: {
                    item: { descriptor: { name: "oil" } },
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            area_code: "680230",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3813081446741677, 103.74788789072721",
                            area_code: "680207",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3826059101531494, 103.743617819222",
                            area_code: "680354",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        code: "bap_terms",
                        list: [
                          { code: "finder_fee_type", value: "percent" },
                          { code: "finder_fee_amount", value: "0" },
                        ],
                      },
                      {
                        code: "buyer_id",
                        list: [
                          { code: "buyer_id_code", value: "gst" },
                          { code: "buyer_id_no", value: "xxxxxxxxxxxxxxx" },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          },
        },
        {
          summary: "Seller returns item/ catalog with communication channel",
          api: "on_search",
          description: "Seller responds back with the catalog",
          reference: "if any",
          example: {
            summary: "Return the catalog",
            description: "Return the catalog",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_search",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                catalog: {
                  fulfillments: [
                    { id: "1", type: "Delivery" },
                    { id: "2", type: "Self-Pickup" },
                  ],
                  payments: [
                    { id: "1", type: "PRE-FULFILLMENT" },
                    { id: "2", type: "ON-FULFILLMENT" },
                    { id: "3", type: "POST-FULFILLMENT" },
                  ],
                  descriptor: {
                    name: "ABC store",
                    short_desc: "Online eCommerce Store",
                    long_desc: "Online eCommerce Store",
                    images: [{ url: "https://abc.com/images/1-shop-img" }],
                  },
                  providers: [
                    {
                      id: "P1",
                      descriptor: {
                        name: "ABC store",
                        code: "P001",
                        short_desc: "ABC store",
                        long_desc: "ABC store",
                        additional_desc: {
                          url: "chat link",
                          content_type: "text/html",
                        },
                        images: [{ url: "https://abc.com/images/1-shop-img" }],
                      },
                      rating: "4.4",
                      ttl: "PT1D",
                      locations: [
                        {
                          id: "L1",
                          gps: "12.967555,77.749666",
                          address: "Jayanagar 4th Block",
                          city: { code: "std:080", name: "Bengaluru" },
                          state: { code: "KA" },
                          country: { code: "IND" },
                          area_code: "560076",
                        },
                      ],
                      creds: [
                        {
                          id: "ESG-12345678",
                          type: "License",
                          desc: "Export License No. ESG-12345678",
                          url: "https://abcd.cdn.com/images/license-img",
                        },
                      ],
                      tags: [
                        {
                          descriptor: { code: "serviceability" },
                          list: [
                            { descriptor: { code: "location" }, value: "L1" },
                            {
                              descriptor: { code: "category" },
                              value: "RET10-1042",
                            },
                            { descriptor: { code: "type" }, value: "12" },
                            { descriptor: { code: "val" }, value: "SGP" },
                            { descriptor: { code: "unit" }, value: "country" },
                          ],
                        },
                        {
                          descriptor: { code: "seller_terms" },
                          list: [
                            {
                              descriptor: { code: "gst_credit_invoice" },
                              value: "Y",
                            },
                          ],
                        },
                        {
                          descriptor: { code: "seller_id" },
                          list: [
                            {
                              descriptor: { code: "seller_id_code" },
                              value: "gst",
                            },
                            {
                              descriptor: { code: "seller_id_no" },
                              value: "xxxxxxxxxxxxxxx",
                            },
                          ],
                        },
                      ],
                      items: [
                        {
                          id: "I1",
                          parent_item_id: "PI1",
                          descriptor: {
                            name: "Dhara Mustard Oil",
                            code: "UPC / EAN code",
                            short_desc: "Dhara refined mustard oil",
                            long_desc: "Dhara refined mustard oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                            media: [
                              { mimetype: "video/mp4", url: "video_url" },
                            ],
                          },
                          creator: {
                            descriptor: {
                              name: "Mother Dairy",
                              contact: {
                                name: "Raj Kumar",
                                address: {
                                  full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                },
                                phone: "18001801018",
                                email: "consumer.services@motherdairy.com",
                              },
                            },
                          },
                          price: {
                            currency: "INR",
                            value: "300.00",
                            offered_value: "250.00",
                            maximum_value: "350.00",
                          },
                          quantity: {
                            unitized: {
                              measure: { unit: "millilitre", value: "500" },
                            },
                            available: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "2000",
                            },
                            maximum: {
                              measure: { unit: "millilitre", value: "500" },
                              count: "4000",
                            },
                          },
                          category_ids: ["RET10-1042"],
                          fulfillment_ids: ["1"],
                          location_ids: ["L1"],
                          payment_ids: ["2"],
                          "add-ons": [
                            {
                              id: "78787723",
                              descriptor: {
                                name: "Dhara Sunflower Oil",
                                short_desc: "Dhara Sunflower Oil",
                                long_desc: "Dhara Sunflower Oil",
                                images: [
                                  { url: "https://abc.com/images/208.png" },
                                ],
                              },
                              price: {
                                currency: "INR",
                                value: "170.0",
                                offered_value: "100.0",
                                maximum_value: "170.0",
                              },
                            },
                          ],
                          cancellation_terms: [
                            {
                              fulfillment_state: {
                                descriptor: { code: "Pending" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Packed" },
                              },
                              refund_eligible: "true",
                            },
                            {
                              fulfillment_state: {
                                descriptor: { code: "Order-delivered" },
                              },
                              return_policy: {
                                return_eligible: "true",
                                return_within: "P7D",
                                fulfillment_managed_by: "seller",
                                return_location: {
                                  address: "RTO address",
                                  gps: "12.667555,77.349666",
                                },
                              },
                            },
                          ],
                          replacement_terms: [{ replace_within: "P7D" }],
                          time: {
                            label: "validity",
                            range: {
                              start: "2022-12-24T00:00:00.000Z",
                              end: "2022-12-31T00:00:00.000Z",
                            },
                          },
                          matched: "true",
                          recommended: "true",
                          tags: [
                            {
                              descriptor: { code: "origin" },
                              list: [
                                {
                                  descriptor: { code: "country" },
                                  value: "IND",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "image" },
                              list: [
                                {
                                  descriptor: { code: "type" },
                                  value: "back_image",
                                },
                                {
                                  descriptor: { code: "url" },
                                  value:
                                    "https://sellerNP.com/images/i1_back_image.png",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "veg_nonveg" },
                              list: [
                                { descriptor: { code: "veg" }, value: "yes" },
                              ],
                            },
                            {
                              descriptor: { code: "g2" },
                              list: [
                                {
                                  descriptor: { code: "time_to_ship" },
                                  value: "P1D",
                                },
                                {
                                  descriptor: { code: "tax_rate" },
                                  value: "12",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "g3" },
                              list: [
                                {
                                  descriptor: { code: "brand" },
                                  value: "Dhara",
                                },
                                {
                                  descriptor: { code: "pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "num_price_slabs" },
                                  value: "3",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "1",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "4",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "250",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "5",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "9",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "200",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "price_slab" },
                              list: [
                                {
                                  descriptor: { code: "min_pack_size" },
                                  value: "10",
                                },
                                {
                                  descriptor: { code: "max_pack_size" },
                                  value: "",
                                },
                                {
                                  descriptor: { code: "unit_sale_price" },
                                  value: "175",
                                },
                              ],
                            },
                            {
                              descriptor: { code: "FSSAI_LICENSE_NO" },
                              list: [
                                {
                                  descriptor: { code: "BRAND_OWNER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "OTHER" },
                                  value: "12345678901234",
                                },
                                {
                                  descriptor: { code: "IMPORTER" },
                                  value: "12345678901234",
                                },
                              ],
                            },
                          ],
                        },
                      ],
                      offers: [
                        {
                          id: "offer-1",
                          descriptor: {
                            name: "Dhara Olive Oil",
                            code: "FREEBIE",
                            short_desc: "Dhara Olive Oil",
                            long_desc: "Dhara Olive Oil",
                            images: [{ url: "https://abc.com/images/207.png" }],
                          },
                          location_ids: [],
                          category_ids: [],
                          item_ids: [],
                          time: {
                            label: "validity",
                            range: {
                              start: "2023-01-08T00:00:00.000Z",
                              end: "2023-01-15T00:00:00.000Z",
                            },
                          },
                        },
                      ],
                      fulfillments: [
                        {
                          contact: {
                            phone: "9886098860",
                            email: "abc@xyz.com",
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer selects an item.",
          api: "select",
          description: "Buyer selects an item",
          reference: "if any",
          example: {
            summary: "Get quote for specific item",
            description:
              "Get quote for specific item with Buyer and Delivery terms",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      location_ids: ["L1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                    },
                  ],
                  fulfillments: [
                    {
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            area_code: "560001",
                          },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Seller returns the breakup based on the price listed.",
          api: "on_select",
          description: "Seller responds with the quote breakup",
          reference: "if any",
          example: {
            summary: "Send quote and breakup",
            description:
              "Send quote and breakup for items selected in select call.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_select",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  items: [{ fulfillment_ids: ["F1"], id: "I1" }],
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      tracking: false,
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      state: { descriptor: { code: "Serviceable" } },
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: {
                          quantity: {
                            available: { count: "200" },
                            maximum: { count: "200" },
                          },
                          price: { currency: "INR", value: "250" },
                        },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                    ],
                    ttl: "P1D",
                  },
                },
              },
            },
          },
        },
        {
          summary: "Buyer Requests for Quotation",
          api: "init",
          description: "Buyer requests for quotation",
          reference: "if any",
          example: {
            summary: "Send buyer and delivery terms for RFQ",
            description: "Send buyer and delivery terms for RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1", locations: [{ id: "L1" }], ttl: "P1D" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  payments: [{ type: "ON-FULFILLMENT" }],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Seller Responds to Quotation",
          api: "on_init",
          description:
            "Seller provides the final quotation with delivery charges",
          reference: "if any",
          example: {
            summary: "Respond to RFQ",
            description: "Respond to RFQ",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_init",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  provider: { id: "P1" },
                  provider_location: { id: "L1" },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      "@ondc/org/provider_name": "Loadshare",
                      "@ondc/org/category": "Express Delivery",
                      "@ondc/org/TAT": "P7D",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          beneficiary_name: "xxxxx",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Buyer raises PO",
          api: "confirm",
          description: "Buyer creates a Purchase Order",
          reference: "if any",
          example: {
            summary: "Raise PO",
            description:
              "PO raised by buyer based on the RFQ response received.",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Created",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                          customer: { person: { name: "Ramu" } },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:30:00.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller Accepts PO",
          api: "on_confirm",
          description: "Seller accepts Purchase Order",
          reference: "if any",
          example: {
            summary: "Accept PO",
            description: "PO acceptance by Seller",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_confirm",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: {
                    id: "P1",
                    locations: [{ id: "L1" }],
                    rateable: true,
                  },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                      "add-ons": [{ id: "78787723" }],
                      tags: [
                        {
                          descriptor: { code: "BUYER_TERMS" },
                          list: [
                            {
                              descriptor: { code: "ITEM_REQ" },
                              value: "free text on Item Customization",
                            },
                            {
                              descriptor: { code: "PACKAGING_REQ" },
                              value: "free text on packaging Customization",
                            },
                          ],
                        },
                      ],
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address:
                      "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                    state: { name: "Karnataka" },
                    city: { name: "Bengaluru" },
                    tax_id: "XXXXXXXXXXXXXXX",
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      state: { descriptor: { code: "Pending" } },
                      type: "Delivery",
                      tracking: false,
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: { name: "ABC Store" },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Status for pickup",
                            short_desc: "Pickup Confirmation Code",
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            address: "My House #, My buildin",
                            city: { name: "Bengaluru" },
                            country: { code: "IND" },
                            area_code: "560001",
                            state: { name: "Karnataka" },
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                      rateable: true,
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  tags: [
                    {
                      descriptor: { code: "buyer_id" },
                      list: [
                        { descriptor: { code: "buyer_id_code" }, value: "gst" },
                        {
                          descriptor: { code: "buyer_id_no" },
                          value: "xxxxxxxxxxxxxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T09:31:30.000Z",
                },
              },
            },
          },
        },
        {
          summary: "Seller sends proforma invoice.",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Pending" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "NOT-PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [
                    { url: "https://invoice_url", label: "PROFORMA_INVOICE" },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary:
            "Payment is collected by buyer (Prepaid) and details are updated",
          api: "on_update",
          description: "Consumer platform sends the payment details",
          reference: "if any",
          example: {
            summary: "Buyer updates payment status",
            description: "Buyer updates payment status (CollectedBy BAP)",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "update",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                update_target: "item",
                order: {
                  id: "O1",
                  state: "Accepted",
                  provider: { id: "P1" },
                  items: [{ id: "I1", quantity: { selected: { count: 200 } } }],
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "0",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "buyer-app",
                          settlement_phase: "sale-amount",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          beneficiary_name: "xxxxx",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                },
              },
            },
          },
        },
        {
          summary: "Consumer platform requests for latest status",
          api: "status",
          description: "Buyer requests for Shipment status",
          reference: "if any",
          example: {
            summary: "Buyer asks for order status",
            description: "Buyer asks for order status",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: { order_id: "O1" },
            },
          },
        },
        {
          summary:
            "Provider platform updates the latest status - Order Picked up",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is picked up",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-picked-up" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary:
            "Provider platform updates the latest status - Out for Delivery",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is out for delivery",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "In-progress",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Out-for-delivery" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BPP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
        {
          summary: "Provider platform updates the latest status - Delivered",
          api: "on_status",
          description:
            "Provider platform provides the updated order status to the consumer once the order is delivered",
          reference: "if any",
          example: {
            summary: "Seller updates the order status and shares Invoice",
            description: "Seller updates the order status and shares Invoice",
            value: {
              context: {
                domain: "ONDC:RET10",
                location: {
                  city: { code: "std:080" },
                  country: { code: "IND" },
                },
                action: "on_status",
                version: "2.0.1",
                bap_id: "buyerapp.com",
                bap_uri: "https://buyerapp.com/grocery",
                bpp_id: "sellerapp.com",
                bpp_uri: "https://sellerapp.com/grocery",
                transaction_id: "T1",
                message_id: "M1",
                timestamp: "2023-01-08T22:00:30.000Z",
                ttl: "PT30S",
              },
              message: {
                order: {
                  id: "O1",
                  state: "Completed",
                  provider: { id: "P1", locations: [{ id: "L1" }] },
                  items: [
                    {
                      id: "I1",
                      fulfillment_ids: ["F1"],
                      quantity: { selected: { count: 200 } },
                    },
                  ],
                  billing: {
                    name: "ONDC buyer",
                    address: "B005 aaspire heights, Jurong East, SGP, 680230",
                    state: { name: "Jurong East" },
                    city: { name: "Jurong East" },
                    email: "nobody@nomail.com",
                    phone: "9886098860",
                  },
                  fulfillments: [
                    {
                      id: "F1",
                      "@ondc/org/provider_name": "Loadshare",
                      type: "Delivery",
                      tracking: false,
                      state: { descriptor: { code: "Order-delivered" } },
                      stops: [
                        {
                          type: "start",
                          location: {
                            id: "L1",
                            descriptor: {
                              name: "ABC Store",
                              images: ["https://gf-integration/images/5.png"],
                            },
                            gps: "12.956399,77.636803",
                          },
                          time: {
                            range: {
                              start: "2023-02-03T10:00:00.000Z",
                              end: "2023-02-03T10:30:00.000Z",
                            },
                            timestamp: "2023-02-03T10:25:00.000Z",
                          },
                          instructions: {
                            name: "Proof of pickup",
                            short_desc: "Proof of pickup details",
                            long_desc: "Proof of pickup details",
                            images: ["https://image1_url.png"],
                          },
                          contact: {
                            phone: "9886098860",
                            email: "nobody@nomail.com",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            address: "My House #, My buildin",
                            city: { name: "Jurong East" },
                            country: { code: "SGP" },
                            area_code: "680230",
                            state: { name: "" },
                          },
                          time: {
                            range: {
                              start: "2023-02-03T11:00:00.000Z",
                              end: "2023-02-03T11:30:00.000Z",
                            },
                            timestamp: "2023-02-03T11:35:00.000Z",
                          },
                          instructions: {
                            name: "Proof of delivery",
                            short_desc: "Proof of delivery details",
                            long_desc: "Proof of delivery details",
                            images: ["https://image1_url.png"],
                          },
                          contact: { phone: "9886098860" },
                          agent: {
                            person: { name: "Ramu" },
                            contact: { phone: "9886098860" },
                          },
                        },
                      ],
                    },
                  ],
                  quote: {
                    price: { currency: "INR", value: "53600" },
                    breakup: [
                      {
                        "@ondc/org/item_id": "I1",
                        "@ondc/org/item_quantity": { count: 200 },
                        title: "Dhara Mustard Oil",
                        "@ondc/org/title_type": "item",
                        price: { currency: "INR", value: "50000" },
                        item: { price: { currency: "INR", value: "250" } },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Delivery charges",
                        "@ondc/org/title_type": "delivery",
                        price: { currency: "INR", value: "4000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Packing charges",
                        "@ondc/org/title_type": "packing",
                        price: { currency: "INR", value: "500" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Tax",
                        "@ondc/org/title_type": "tax",
                        price: { currency: "INR", value: "0" },
                      },
                      {
                        "@ondc/org/item_id": "I1",
                        title: "Discount",
                        "@ondc/org/title_type": "discount",
                        price: { currency: "INR", value: "-1000" },
                      },
                      {
                        "@ondc/org/item_id": "F1",
                        title: "Convenience Fee",
                        "@ondc/org/title_type": "misc",
                        price: { currency: "INR", value: "100" },
                      },
                    ],
                    ttl: "P1D",
                  },
                  payments: [
                    {
                      uri: "https://ondc.transaction.com/payment",
                      tl_method: "http/get",
                      params: {
                        currency: "INR",
                        transaction_id: "3937",
                        amount: "53600",
                      },
                      status: "PAID",
                      type: "PRE-FULFILLMENT",
                      collected_by: "BAP",
                      "@ondc/org/buyer_app_finder_fee_type": "percent",
                      "@ondc/org/buyer_app_finder_fee_amount": "3",
                      "@ondc/org/settlement_details": [
                        {
                          settlement_counterparty: "seller-app",
                          settlement_phase: "sale-amount",
                          beneficiary_name: "xxxxx",
                          settlement_reference: "XXXX",
                          settlement_status: "PAID",
                          settlement_timestamp: "2023-02-04T10:00:00.000Z",
                          settlement_type: "upi",
                          upi_address: "gft@oksbi",
                          settlement_bank_account_no: "XXXXXXXXXX",
                          settlement_ifsc_code: "XXXXXXXXX",
                          bank_name: "xxxx",
                          branch_name: "xxxx",
                        },
                      ],
                    },
                  ],
                  documents: [{ url: "https://invoice_url", label: "Invoice" }],
                  created_at: "2023-02-03T09:30:00.000Z",
                  updated_at: "2023-02-03T10:00:00.201Z",
                },
              },
            },
          },
        },
      ],
    },
  ],
  "x-examples": {
    B2B: {
      summary: "B2B Use Case Specification",
      description:
        "Retail , use case on the network of different entities coming together to offer products or services to buyers on one end and manage sellers on the other end. Consumer Platform use these  specifications to perform e-commerce operations like search, select, confirm and track.At provider platform would use these specifications expose there specific invetory in form of on_search, on_select etc.",
      example_set: {
        search: {
          examples: [
            {
              summary: "search_by_item",
              description: "Search By Item",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:00.000Z",
                  ttl: "PT30S",
                },
                message: {
                  intent: {
                    item: { descriptor: { name: "oil" } },
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "1.3806217468119772, 103.74636438437074",
                            area_code: "680230",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3813081446741677, 103.74788789072721",
                            area_code: "680207",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "1.3826059101531494, 103.743617819222",
                            area_code: "680354",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        descriptor: { code: "bap_terms" },
                        list: [
                          {
                            descriptor: { code: "finder_fee_type" },
                            value: "percent",
                          },
                          {
                            descriptor: { code: "finder_fee_amount" },
                            value: "0",
                          },
                        ],
                      },
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                    intent: {
                      item: { descriptor: { name: "oil" } },
                      fulfillment: {
                        type: "Delivery",
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              area_code: "680230",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3813081446741677, 103.74788789072721",
                              area_code: "680207",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3826059101531494, 103.743617819222",
                              area_code: "680354",
                            },
                          },
                        ],
                      },
                      payment: { type: "ON-FULFILLMENT" },
                      tags: [
                        {
                          code: "bap_terms",
                          list: [
                            { code: "finder_fee_type", value: "percent" },
                            { code: "finder_fee_amount", value: "0" },
                          ],
                        },
                        {
                          code: "buyer_id",
                          list: [
                            { code: "buyer_id_code", value: "gst" },
                            { code: "buyer_id_no", value: "xxxxxxxxxxxxxxx" },
                          ],
                        },
                      ],
                    },
                  },
                },
              },
            },
            {
              summary: "search_by_category",
              description: "Search By Category",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:00.000Z",
                  ttl: "PT30S",
                },
                message: {
                  intent: {
                    item: { category: { id: "RET10-*" } },
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            area_code: "560001",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.944002,77.603458",
                            area_code: "560004",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.904002,77.593458",
                            area_code: "560076",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        descriptor: { code: "bap_terms" },
                        list: [
                          {
                            descriptor: { code: "finder_fee_type" },
                            value: "percent",
                          },
                          {
                            descriptor: { code: "finder_fee_amount" },
                            value: "10",
                          },
                        ],
                      },
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "search_by_fulfillment",
              description: "Search By Fulfillment",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:00.000Z",
                  ttl: "PT30S",
                },
                message: {
                  intent: {
                    fulfillment: {
                      type: "Delivery",
                      stops: [
                        {
                          type: "end",
                          location: {
                            gps: "12.974002,77.613458",
                            area_code: "560001",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.944002,77.603458",
                            area_code: "560004",
                          },
                        },
                        {
                          type: "end",
                          location: {
                            gps: "12.904002,77.593458",
                            area_code: "560076",
                          },
                        },
                      ],
                    },
                    payment: { type: "ON-FULFILLMENT" },
                    tags: [
                      {
                        descriptor: { code: "bap_terms" },
                        list: [
                          {
                            descriptor: { code: "finder_fee_type" },
                            value: "percent",
                          },
                          {
                            descriptor: { code: "finder_fee_amount" },
                            value: "10",
                          },
                        ],
                      },
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        select: {
          examples: [
            {
              summary: "Get quote for specific item",
              description:
                "Get quote for specific item with Buyer and Delivery terms",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "select",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        location_ids: ["L1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                      },
                    ],
                    fulfillments: [
                      {
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "12.974002,77.613458",
                              area_code: "560001",
                            },
                          },
                        ],
                      },
                    ],
                    payments: [{ type: "ON-FULFILLMENT" }],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Get quote for specific item",
              description:
                "Get quote for specific item with Buyer and Delivery terms",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "select",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        location_ids: ["L1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                      },
                    ],
                    fulfillments: [
                      {
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              area_code: "680230",
                            },
                          },
                        ],
                        customer: {
                          person: {
                            creds: [
                              {
                                id: "ESG-12345678",
                                type: "License",
                                desc: "Import License No. ESG-12345678",
                                icon: "https://abcd.cdn.com/images/license-img",
                                url: "https://abcd.dnb.com/verify?id=’ESG-12345678'",
                              },
                            ],
                          },
                        },
                      },
                    ],
                    payments: [{ type: "ON-FULFILLMENT" }],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Get quote for specific item",
              description:
                "Get quote for specific item with Buyer and Delivery terms",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "select",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: {
                      id: "P1",
                      locations: [{ id: "L1" }],
                      ttl: "P1D",
                    },
                    items: [
                      {
                        id: "I1",
                        location_ids: ["L1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                      },
                    ],
                    fulfillments: [
                      {
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              area_code: "680230",
                            },
                          },
                        ],
                        customer: {
                          person: {
                            creds: [
                              {
                                id: "ESG-12345678",
                                type: "License",
                                desc: "Import License No. ESG-12345678",
                                icon: "https://abcd.cdn.com/images/license-img",
                                url: "https://abcd.dnb.com/verify?id=’ESG-12345678'",
                              },
                            ],
                          },
                        },
                      },
                    ],
                    payments: [{ type: "ON-FULFILLMENT" }],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                      {
                        descriptor: { code: "COMM_CHANNEL" },
                        list: [
                          {
                            descriptor: { code: "chat_url" },
                            value: "https://chatengine.xxx.in/",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        init: {
          examples: [
            {
              summary: "Send buyer and delivery terms for RFQ",
              description: "Send buyer and delivery terms for RFQ",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:999" },
                    country: { code: "IND" },
                  },
                  action: "init",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: {
                      id: "P1",
                      locations: [{ id: "L1" }],
                      ttl: "P1D",
                    },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        type: "Delivery",
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                        customer: {
                          person: {
                            creds: [
                              {
                                id: "ESG-12345678",
                                type: "License",
                                desc: "Import License No. ESG-12345678",
                                icon: "https://abcd.cdn.com/images/license-img",
                                url: "https://abcd.dnb.com/verify?id=’ESG-12345678'",
                              },
                            ],
                          },
                        },
                        tags: [
                          {
                            descriptor: { code: "DELIVERY_TERMS" },
                            list: [
                              {
                                descriptor: { code: "INCOTERMS" },
                                value: "CIF",
                              },
                              {
                                descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                                value: "SGP",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    payments: [{ type: "ON-FULFILLMENT" }],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Send buyer and delivery terms for RFQ",
              description: "Send buyer and delivery terms for RFQ",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "init",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: {
                      id: "P1",
                      locations: [{ id: "L1" }],
                      ttl: "P1D",
                    },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address:
                        "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                      state: { name: "Karnataka" },
                      city: { name: "Bengaluru" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        type: "Delivery",
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "12.974002,77.613458",
                              address: "My House #, My buildin",
                              city: { name: "Bengaluru" },
                              country: { code: "IND" },
                              area_code: "560001",
                              state: { name: "Karnataka" },
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                      },
                    ],
                    payments: [{ type: "ON-FULFILLMENT" }],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        confirm: {
          examples: [
            {
              summary: "Raise PO",
              description:
                "PO raised by buyer based on the RFQ response received.",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "confirm",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Created",
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address:
                        "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                      state: { name: "Karnataka" },
                      city: { name: "Bengaluru" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        type: "Delivery",
                        tracking: false,
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "12.974002,77.613458",
                              address: "My House #, My buildin",
                              city: { name: "Bengaluru" },
                              country: { code: "IND" },
                              area_code: "560001",
                              state: { name: "Karnataka" },
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                            customer: { person: { name: "Ramu" } },
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "NOT-PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            beneficiary_name: "xxxxx",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T09:30:00.000Z",
                  },
                },
              },
            },
            {
              summary: "Raise PO",
              description:
                "PO raised by buyer based on the RFQ response received.",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "confirm",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Created",
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        type: "Delivery",
                        tracking: false,
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                            customer: { person: { name: "Ramu" } },
                          },
                        ],
                        tags: [
                          {
                            descriptor: { code: "DELIVERY_TERMS" },
                            list: [
                              {
                                descriptor: { code: "INCOTERMS" },
                                value: "CIF",
                              },
                              {
                                descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                                value: "SGP",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "NOT-PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            beneficiary_name: "xxxxx",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T09:30:00.000Z",
                  },
                },
              },
            },
          ],
        },
        update: {
          examples: [
            {
              summary: "Buyer updates payment status",
              description: "Buyer updates payment status (CollectedBy BAP)",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "update",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  update_target: "item",
                  order: {
                    id: "O1",
                    state: "Accepted",
                    provider: { id: "P1" },
                    items: [
                      { id: "I1", quantity: { selected: { count: 200 } } },
                    ],
                    payments: [
                      {
                        uri: "https://ondc.transaction.com/payment",
                        tl_method: "http/get",
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BAP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            beneficiary_name: "xxxxx",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        status: {
          examples: [
            {
              summary: "Buyer asks for order status",
              description: "Buyer asks for order status",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "status",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: { order_id: "O1" },
              },
            },
          ],
        },
        on_search: {
          examples: [
            {
              summary: "Return the catalog",
              description: "Return the catalog",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  catalog: {
                    fulfillments: [
                      { id: "1", type: "Delivery" },
                      { id: "2", type: "Self-Pickup" },
                    ],
                    payments: [
                      { id: "1", type: "PRE-FULFILLMENT" },
                      { id: "2", type: "ON-FULFILLMENT" },
                      { id: "3", type: "POST-FULFILLMENT" },
                    ],
                    descriptor: {
                      name: "ABC store",
                      short_desc: "Online eCommerce Store",
                      long_desc: "Online eCommerce Store",
                      images: [{ url: "https://abc.com/images/1-shop-img" }],
                    },
                    providers: [
                      {
                        id: "P1",
                        descriptor: {
                          name: "ABC store",
                          code: "P001",
                          short_desc: "ABC store",
                          long_desc: "ABC store",
                          additional_desc: {
                            url: "chat link",
                            content_type: "text/html",
                          },
                          images: [
                            { url: "https://abc.com/images/1-shop-img" },
                          ],
                        },
                        rating: "4.4",
                        ttl: "PT1D",
                        locations: [
                          {
                            id: "L1",
                            gps: "12.967555,77.749666",
                            address: "Jayanagar 4th Block",
                            city: { code: "std:080", name: "Bengaluru" },
                            state: { code: "KA" },
                            country: { code: "IND" },
                            area_code: "560076",
                          },
                        ],
                        creds: [
                          {
                            id: "ESG-12345678",
                            type: "License",
                            desc: "Export License No. ESG-12345678",
                            url: "https://abcd.cdn.com/images/license-img",
                          },
                        ],
                        tags: [
                          {
                            descriptor: { code: "serviceability" },
                            list: [
                              { descriptor: { code: "location" }, value: "L1" },
                              {
                                descriptor: { code: "category" },
                                value: "RET10-1042",
                              },
                              { descriptor: { code: "type" }, value: "12" },
                              { descriptor: { code: "val" }, value: "SGP" },
                              {
                                descriptor: { code: "unit" },
                                value: "country",
                              },
                            ],
                          },
                          {
                            descriptor: { code: "seller_terms" },
                            list: [
                              {
                                descriptor: { code: "gst_credit_invoice" },
                                value: "Y",
                              },
                            ],
                          },
                          {
                            descriptor: { code: "seller_id" },
                            list: [
                              {
                                descriptor: { code: "seller_id_code" },
                                value: "gst",
                              },
                              {
                                descriptor: { code: "seller_id_no" },
                                value: "xxxxxxxxxxxxxxx",
                              },
                            ],
                          },
                        ],
                        items: [
                          {
                            id: "I1",
                            parent_item_id: "PI1",
                            descriptor: {
                              name: "Dhara Mustard Oil",
                              code: "UPC / EAN code",
                              short_desc: "Dhara refined mustard oil",
                              long_desc: "Dhara refined mustard oil",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                              media: [
                                { mimetype: "video/mp4", url: "video_url" },
                              ],
                            },
                            creator: {
                              descriptor: {
                                name: "Mother Dairy",
                                contact: {
                                  name: "Raj Kumar",
                                  address: {
                                    full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                  },
                                  phone: "18001801018",
                                  email: "consumer.services@motherdairy.com",
                                },
                              },
                            },
                            price: {
                              currency: "INR",
                              value: "300.00",
                              offered_value: "250.00",
                              maximum_value: "350.00",
                            },
                            quantity: {
                              unitized: {
                                measure: { unit: "millilitre", value: "500" },
                              },
                              available: {
                                measure: { unit: "millilitre", value: "500" },
                                count: "2000",
                              },
                              maximum: {
                                measure: { unit: "millilitre", value: "500" },
                                count: "4000",
                              },
                            },
                            category_ids: ["RET10-1042"],
                            fulfillment_ids: ["1"],
                            location_ids: ["L1"],
                            payment_ids: ["2"],
                            "add-ons": [
                              {
                                id: "78787723",
                                descriptor: {
                                  name: "Dhara Sunflower Oil",
                                  short_desc: "Dhara Sunflower Oil",
                                  long_desc: "Dhara Sunflower Oil",
                                  images: [
                                    { url: "https://abc.com/images/208.png" },
                                  ],
                                },
                                price: {
                                  currency: "INR",
                                  value: "170.0",
                                  offered_value: "100.0",
                                  maximum_value: "170.0",
                                },
                              },
                            ],
                            cancellation_terms: [
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Pending" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Packed" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Order-delivered" },
                                },
                                return_policy: {
                                  return_eligible: "true",
                                  return_within: "P7D",
                                  fulfillment_managed_by: "seller",
                                  return_location: {
                                    address: "RTO address",
                                    gps: "12.667555,77.349666",
                                  },
                                },
                              },
                            ],
                            replacement_terms: [{ replace_within: "P7D" }],
                            time: {
                              label: "validity",
                              range: {
                                start: "2022-12-24T00:00:00.000Z",
                                end: "2022-12-31T00:00:00.000Z",
                              },
                            },
                            matched: "true",
                            recommended: "true",
                            tags: [
                              {
                                descriptor: { code: "origin" },
                                list: [
                                  {
                                    descriptor: { code: "country" },
                                    value: "IND",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "image" },
                                list: [
                                  {
                                    descriptor: { code: "type" },
                                    value: "back_image",
                                  },
                                  {
                                    descriptor: { code: "url" },
                                    value:
                                      "https://sellerNP.com/images/i1_back_image.png",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "veg_nonveg" },
                                list: [
                                  { descriptor: { code: "veg" }, value: "yes" },
                                ],
                              },
                              {
                                descriptor: { code: "g2" },
                                list: [
                                  {
                                    descriptor: { code: "time_to_ship" },
                                    value: "P1D",
                                  },
                                  {
                                    descriptor: { code: "tax_rate" },
                                    value: "12",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "g3" },
                                list: [
                                  {
                                    descriptor: { code: "brand" },
                                    value: "Dhara",
                                  },
                                  {
                                    descriptor: { code: "pack_size" },
                                    value: "5",
                                  },
                                  {
                                    descriptor: { code: "num_price_slabs" },
                                    value: "3",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "price_slab" },
                                list: [
                                  {
                                    descriptor: { code: "min_pack_size" },
                                    value: "1",
                                  },
                                  {
                                    descriptor: { code: "max_pack_size" },
                                    value: "4",
                                  },
                                  {
                                    descriptor: { code: "unit_sale_price" },
                                    value: "250",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "price_slab" },
                                list: [
                                  {
                                    descriptor: { code: "min_pack_size" },
                                    value: "5",
                                  },
                                  {
                                    descriptor: { code: "max_pack_size" },
                                    value: "9",
                                  },
                                  {
                                    descriptor: { code: "unit_sale_price" },
                                    value: "200",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "price_slab" },
                                list: [
                                  {
                                    descriptor: { code: "min_pack_size" },
                                    value: "10",
                                  },
                                  {
                                    descriptor: { code: "max_pack_size" },
                                    value: "",
                                  },
                                  {
                                    descriptor: { code: "unit_sale_price" },
                                    value: "175",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "FSSAI_LICENSE_NO" },
                                list: [
                                  {
                                    descriptor: { code: "BRAND_OWNER" },
                                    value: "12345678901234",
                                  },
                                  {
                                    descriptor: { code: "OTHER" },
                                    value: "12345678901234",
                                  },
                                  {
                                    descriptor: { code: "IMPORTER" },
                                    value: "12345678901234",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        offers: [
                          {
                            id: "offer-1",
                            descriptor: {
                              name: "Dhara Olive Oil",
                              code: "FREEBIE",
                              short_desc: "Dhara Olive Oil",
                              long_desc: "Dhara Olive Oil",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                            },
                            location_ids: [],
                            category_ids: [],
                            item_ids: [],
                            time: {
                              label: "validity",
                              range: {
                                start: "2023-01-08T00:00:00.000Z",
                                end: "2023-01-15T00:00:00.000Z",
                              },
                            },
                          },
                        ],
                        fulfillments: [
                          {
                            contact: {
                              phone: "9886098860",
                              email: "abc@xyz.com",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Return the catalog for BPC products",
              description: "Return the catalog for BPC products",
              value: {
                context: {
                  domain: "ONDC:RET13",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/bpc",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/bpc",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  catalog: {
                    fulfillments: [
                      { id: "1", type: "Delivery" },
                      { id: "2", type: "Self-Pickup" },
                    ],
                    payments: [
                      { id: "1", type: "PRE-FULFILLMENT" },
                      { id: "2", type: "ON-FULFILLMENT" },
                      { id: "3", type: "POST-FULFILLMENT" },
                    ],
                    descriptor: {
                      name: "ABC store",
                      short_desc: "Online eCommerce Store",
                      long_desc: "Online eCommerce Store",
                      images: [{ url: "https://abc.com/images/1-shop-img" }],
                    },
                    providers: [
                      {
                        id: "P1",
                        descriptor: {
                          name: "ABC store",
                          code: "P001",
                          short_desc: "ABC store",
                          long_desc: "ABC store",
                          additional_desc: {
                            url: "chat link",
                            content_type: "text/html",
                          },
                          images: [
                            { url: "https://abc.com/images/1-shop-img" },
                          ],
                        },
                        rating: "4.4",
                        ttl: "PT1D",
                        locations: [
                          {
                            id: "L1",
                            gps: "12.967555,77.749666",
                            address: "Jayanagar 4th Block",
                            city: { code: "std:080", name: "Bengaluru" },
                            state: { code: "KA" },
                            country: { code: "IND" },
                            area_code: "560076",
                          },
                        ],
                        creds: [
                          {
                            id: "ESG-12345678",
                            type: "License",
                            desc: "Export License No. ESG-12345678",
                            url: "https://abcd.cdn.com/images/license-img",
                          },
                        ],
                        tags: [
                          {
                            code: "serviceability",
                            list: [
                              { code: "location", value: "L1" },
                              { code: "category", value: "RET10-1042" },
                              { code: "type", value: "12" },
                              { code: "val", value: "SGP" },
                              { code: "unit", value: "country" },
                            ],
                          },
                          {
                            code: "seller_terms",
                            list: [{ code: "gst_credit_invoice", value: "Y" }],
                          },
                          {
                            code: "seller_id",
                            list: [
                              { code: "seller_id_code", value: "gst" },
                              {
                                code: "seller_id_no",
                                value: "xxxxxxxxxxxxxxx",
                              },
                            ],
                          },
                        ],
                        items: [
                          {
                            id: "I1",
                            parent_item_id: "V1",
                            descriptor: {
                              name: "Kesh King Ayurvedic Hair Oil",
                              code: "UPC / EAN code",
                              short_desc: "Kesh King Ayurvedic Hair Oil",
                              long_desc: "Kesh King Ayurvedic Hair Oil",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                              media: [
                                {
                                  mimetype: "video/mp4",
                                  url: "https://abc.com/images/207.mp4",
                                },
                              ],
                            },
                            creator: {
                              descriptor: {
                                name: "Emami Ltd",
                                contact: {
                                  name: "Raj Kumar",
                                  address: {
                                    full: "Emami Ltd., 687 Anandapur, Kolkata 700107",
                                  },
                                  phone: "18001801018",
                                  email: "info@keshking.com",
                                },
                              },
                            },
                            price: {
                              currency: "INR",
                              value: "300.00",
                              offered_value: "250.00",
                              maximum_value: "350.00",
                            },
                            quantity: {
                              unitized: {
                                measure: { unit: "millilitre", value: "500" },
                              },
                              available: {
                                measure: { unit: "millilitre", value: "500" },
                                count: "2000",
                              },
                              maximum: {
                                measure: { unit: "millilitre", value: "500" },
                                count: "4000",
                              },
                            },
                            category_ids: ["RET10-1042"],
                            fulfillment_ids: ["1"],
                            location_ids: ["L1"],
                            payment_ids: ["2"],
                            "add-ons": [
                              {
                                id: "78787723",
                                descriptor: {
                                  name: "Kesh King Ayurvedic Shampoo",
                                  short_desc: "Kesh King Ayurvedic Shampoo",
                                  long_desc: "Kesh King Ayurvedic Shampoo",
                                  images: [
                                    { url: "https://abc.com/images/208.png" },
                                  ],
                                },
                                price: {
                                  currency: "INR",
                                  value: "170.0",
                                  offered_value: "100.0",
                                  maximum_value: "170.0",
                                },
                              },
                            ],
                            cancellation_terms: [
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Pending" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Packed" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Order-delivered" },
                                },
                                return_policy: {
                                  return_eligible: "true",
                                  return_within: "P7D",
                                  fulfillment_managed_by: "seller",
                                  return_location: {
                                    address: "RTO address",
                                    gps: "12.667555,77.349666",
                                  },
                                },
                              },
                            ],
                            replacement_terms: [{ replace_within: "P7D" }],
                            time: {
                              label: "validity",
                              range: {
                                start: "2022-12-24T00:00:00.000Z",
                                end: "2022-12-31T00:00:00.000Z",
                              },
                            },
                            matched: "true",
                            recommended: "true",
                            tags: [
                              {
                                code: "origin",
                                list: [{ code: "country", value: "IND" }],
                              },
                              {
                                code: "image",
                                list: [
                                  { code: "type", value: "back_image" },
                                  {
                                    code: "url",
                                    value:
                                      "https://sellerNP.com/images/i1_back_image.png",
                                  },
                                ],
                              },
                              {
                                code: "attribute",
                                list: [
                                  { code: "brand", value: "Kesh King" },
                                  { code: "colour", value: "black" },
                                  { code: "gender", value: "male" },
                                  { code: "concern", value: "tangled_hair" },
                                  { code: "ingredient", value: "neem" },
                                  { code: "conscious", value: "natural" },
                                  { code: "preference", value: "herbal" },
                                  { code: "formulation", value: "liquid" },
                                  { code: "skin_type", value: "normal" },
                                ],
                              },
                              {
                                code: "g2",
                                list: [
                                  { code: "time_to_ship", value: "P1D" },
                                  { code: "tax_rate", value: "12" },
                                ],
                              },
                              {
                                code: "g3",
                                list: [
                                  { code: "brand", value: "Dhara" },
                                  { code: "pack_size", value: "5" },
                                  { code: "num_price_slabs", value: "3" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "1" },
                                  { code: "max_pack_size", value: "4" },
                                  { code: "unit_sale_price", value: "250" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "5" },
                                  { code: "max_pack_size", value: "9" },
                                  { code: "unit_sale_price", value: "200" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "10" },
                                  { code: "max_pack_size", value: "" },
                                  { code: "unit_sale_price", value: "175" },
                                ],
                              },
                              {
                                code: "FSSAI_LICENSE_NO",
                                list: [
                                  {
                                    code: "BRAND_OWNER",
                                    value: "12345678901234",
                                  },
                                  { code: "OTHER", value: "12345678901234" },
                                  { code: "IMPORTER", value: "12345678901234" },
                                ],
                              },
                            ],
                          },
                        ],
                        offers: [
                          {
                            id: "offer-1",
                            descriptor: {
                              name: "Kesh King Ayurvedic Shampoo",
                              code: "FREEBIE",
                              short_desc:
                                "Kesh King Ayurvedic Shampoo 5 ml Pouch",
                              long_desc:
                                "Kesh King Ayurvedic Shampoo 5 ml Pouch",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                            },
                            location_ids: [],
                            category_ids: [],
                            item_ids: [],
                            time: {
                              label: "validity",
                              range: {
                                start: "2023-01-08T00:00:00.000Z",
                                end: "2023-01-15T00:00:00.000Z",
                              },
                            },
                          },
                        ],
                        fulfillments: [
                          {
                            contact: {
                              phone: "9886098860",
                              email: "abc@xyz.com",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Return the catalog for Fashion products",
              description: "Return the catalog for Fashion products",
              value: {
                context: {
                  domain: "ONDC:RET12",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/fs",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/fs",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  catalog: {
                    fulfillments: [
                      { id: "1", type: "Delivery" },
                      { id: "2", type: "Self-Pickup" },
                    ],
                    payments: [
                      { id: "1", type: "PRE-FULFILLMENT" },
                      { id: "2", type: "ON-FULFILLMENT" },
                      { id: "3", type: "POST-FULFILLMENT" },
                    ],
                    descriptor: {
                      name: "ABC store",
                      short_desc: "Online eCommerce Store",
                      long_desc: "Online eCommerce Store",
                      images: [{ url: "https://abc.com/images/1-shop-img" }],
                    },
                    providers: [
                      {
                        id: "P1",
                        descriptor: {
                          name: "ABC store",
                          code: "P001",
                          short_desc: "ABC store",
                          long_desc: "ABC store",
                          additional_desc: {
                            url: "chat link",
                            content_type: "text/html",
                          },
                          images: [
                            { url: "https://abc.com/images/1-shop-img" },
                          ],
                        },
                        rating: "4.4",
                        ttl: "PT1D",
                        locations: [
                          {
                            id: "L1",
                            gps: "12.967555,77.749666",
                            address: "Jayanagar 4th Block",
                            city: { code: "std:080", name: "Bengaluru" },
                            state: { code: "KA" },
                            country: { code: "IND" },
                            area_code: "560076",
                          },
                        ],
                        creds: [
                          {
                            id: "ESG-12345678",
                            type: "License",
                            desc: "Export License No. ESG-12345678",
                            url: "https://abcd.cdn.com/images/license-img",
                          },
                        ],
                        tags: [
                          {
                            code: "serviceability",
                            list: [
                              { code: "location", value: "L1" },
                              { code: "category", value: "RET10-1042" },
                              { code: "type", value: "12" },
                              { code: "val", value: "SGP" },
                              { code: "unit", value: "country" },
                            ],
                          },
                          {
                            code: "seller_terms",
                            list: [{ code: "gst_credit_invoice", value: "Y" }],
                          },
                          {
                            code: "seller_id",
                            list: [
                              { code: "seller_id_code", value: "gst" },
                              {
                                code: "seller_id_no",
                                value: "xxxxxxxxxxxxxxx",
                              },
                            ],
                          },
                        ],
                        categories: [
                          {
                            id: "V1",
                            descriptor: { name: "Variant Group 1" },
                            tags: [
                              {
                                code: "type",
                                list: [
                                  { code: "type", value: "variant_group" },
                                ],
                              },
                              {
                                code: "attr",
                                list: [
                                  {
                                    code: "name",
                                    value: "item.tags.attribute.colour",
                                  },
                                  { code: "seq", value: "1" },
                                ],
                              },
                              {
                                code: "attr",
                                list: [
                                  {
                                    code: "name",
                                    value: "item.tags.attribute.size",
                                  },
                                  { code: "seq", value: "2" },
                                ],
                              },
                            ],
                          },
                        ],
                        items: [
                          {
                            id: "I1",
                            parent_item_id: "V1",
                            descriptor: {
                              name: "Allen Solly Men T-shirt",
                              code: "UPC / EAN code",
                              short_desc: "Allen Solly Men T-shirt",
                              long_desc: "Allen Solly Men T-shirt",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                              media: [
                                {
                                  mimetype: "video/mp4",
                                  url: "https://abc.com/images/207.mp4",
                                },
                              ],
                            },
                            creator: {
                              descriptor: {
                                name: "xxxxx",
                                contact: {
                                  name: "xxxx",
                                  address: {
                                    full: "Allen Solly Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                  },
                                  phone: "18001801018",
                                  email: "consumer.services@xxxx.com",
                                },
                              },
                            },
                            price: {
                              currency: "INR",
                              value: "300.00",
                              offered_value: "250.00",
                              maximum_value: "350.00",
                            },
                            quantity: {
                              unitized: {
                                measure: { unit: "unit", value: "1" },
                              },
                              available: {
                                measure: { unit: "unit", value: "1" },
                                count: "99",
                              },
                              maximum: {
                                measure: { unit: "unit", value: "1" },
                                count: "99",
                              },
                            },
                            category_ids: ["RET12-102F"],
                            fulfillment_ids: ["1"],
                            location_ids: ["L1"],
                            payment_ids: ["2"],
                            cancellation_terms: [
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Pending" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Packed" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Order-delivered" },
                                },
                                return_policy: {
                                  return_eligible: "true",
                                  return_within: "P7D",
                                  fulfillment_managed_by: "seller",
                                  return_location: {
                                    address: "RTO address",
                                    gps: "12.667555,77.349666",
                                  },
                                },
                              },
                            ],
                            replacement_terms: [{ replace_within: "P7D" }],
                            time: {
                              label: "validity",
                              range: {
                                start: "2022-12-24T00:00:00.000Z",
                                end: "2022-12-31T00:00:00.000Z",
                              },
                            },
                            matched: "true",
                            recommended: "true",
                            tags: [
                              {
                                code: "origin",
                                list: [{ code: "country", value: "IND" }],
                              },
                              {
                                code: "image",
                                list: [
                                  { code: "type", value: "back_image" },
                                  {
                                    code: "url",
                                    value:
                                      "https://sellerNP.com/images/i1_back_image.png",
                                  },
                                ],
                              },
                              {
                                code: "attribute",
                                list: [
                                  { code: "brand", value: "Allen Solly" },
                                  { code: "colour", value: "coral" },
                                  { code: "size", value: "S" },
                                  { code: "gender", value: "male" },
                                  { code: "pattern", value: "striped" },
                                  { code: "material", value: "cotton" },
                                  { code: "occasion", value: "casual" },
                                  { code: "season", value: "summer" },
                                  { code: "trend", value: "tribal" },
                                  { code: "features", value: "alpha" },
                                  {
                                    code: "material_finish",
                                    value: "embossed",
                                  },
                                  {
                                    code: "size_chart",
                                    value:
                                      "https://sellerNP.com/images/i1_size_chart.png",
                                  },
                                ],
                              },
                              {
                                code: "g2",
                                list: [
                                  { code: "time_to_ship", value: "P1D" },
                                  { code: "tax_rate", value: "12" },
                                ],
                              },
                              {
                                code: "g3",
                                list: [
                                  { code: "brand", value: "Dhara" },
                                  { code: "pack_size", value: "5" },
                                  { code: "num_price_slabs", value: "3" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "1" },
                                  { code: "max_pack_size", value: "4" },
                                  { code: "unit_sale_price", value: "250" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "5" },
                                  { code: "max_pack_size", value: "9" },
                                  { code: "unit_sale_price", value: "200" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "10" },
                                  { code: "max_pack_size", value: "" },
                                  { code: "unit_sale_price", value: "175" },
                                ],
                              },
                            ],
                          },
                          {
                            id: "I2",
                            parent_item_id: "V1",
                            descriptor: {
                              name: "Allen Solly Men T-shirt",
                              code: "UPC / EAN code",
                              short_desc: "Allen Solly Men T-shirt",
                              long_desc: "Allen Solly Men T-shirt",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                              media: [
                                { mimetype: "video/mp4", url: "video_url" },
                              ],
                            },
                            creator: {
                              descriptor: {
                                name: "xxxxx",
                                contact: {
                                  name: "xxxx",
                                  address: {
                                    full: "Allen Solly Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                  },
                                  phone: "18001801018",
                                  email: "consumer.services@xxxx.com",
                                },
                              },
                            },
                            price: {
                              currency: "INR",
                              value: "300.00",
                              offered_value: "250.00",
                              maximum_value: "350.00",
                            },
                            quantity: {
                              unitized: {
                                measure: { unit: "unit", value: "1" },
                              },
                              available: {
                                measure: { unit: "unit", value: "1" },
                                count: "99",
                              },
                              maximum: {
                                measure: { unit: "unit", value: "1" },
                                count: "99",
                              },
                            },
                            category_ids: ["RET12-102F"],
                            fulfillment_ids: ["1"],
                            location_ids: ["L1"],
                            payment_ids: ["2"],
                            cancellation_terms: [
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Pending" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Packed" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Order-delivered" },
                                },
                                return_policy: {
                                  return_eligible: "true",
                                  return_within: "P7D",
                                  fulfillment_managed_by: "seller",
                                  return_location: {
                                    address: "RTO address",
                                    gps: "12.667555,77.349666",
                                  },
                                },
                              },
                            ],
                            replacement_terms: [{ replace_within: "P7D" }],
                            time: {
                              label: "validity",
                              range: {
                                start: "2022-12-24T00:00:00.000Z",
                                end: "2022-12-31T00:00:00.000Z",
                              },
                            },
                            matched: "true",
                            recommended: "true",
                            tags: [
                              {
                                code: "origin",
                                list: [{ code: "country", value: "IND" }],
                              },
                              {
                                code: "image",
                                list: [
                                  { code: "type", value: "back_image" },
                                  {
                                    code: "url",
                                    value:
                                      "https://sellerNP.com/images/i1_back_image.png",
                                  },
                                ],
                              },
                              {
                                code: "attribute",
                                list: [
                                  { code: "brand", value: "Allen Solly" },
                                  { code: "colour", value: "coral" },
                                  { code: "size", value: "M" },
                                  { code: "gender", value: "male" },
                                  { code: "pattern", value: "striped" },
                                  { code: "material", value: "cotton" },
                                  { code: "occasion", value: "casual" },
                                  { code: "season", value: "summer" },
                                  { code: "trend", value: "tribal" },
                                  { code: "features", value: "alpha" },
                                  {
                                    code: "material_finish",
                                    value: "embossed",
                                  },
                                  {
                                    code: "size_chart",
                                    value:
                                      "https://sellerNP.com/images/i1_size_chart.png",
                                  },
                                ],
                              },
                              {
                                code: "g2",
                                list: [
                                  { code: "time_to_ship", value: "P1D" },
                                  { code: "tax_rate", value: "12" },
                                ],
                              },
                              {
                                code: "g3",
                                list: [
                                  { code: "brand", value: "Allen Solly" },
                                  { code: "pack_size", value: "5" },
                                  { code: "num_price_slabs", value: "3" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "1" },
                                  { code: "max_pack_size", value: "4" },
                                  { code: "unit_sale_price", value: "250" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "5" },
                                  { code: "max_pack_size", value: "9" },
                                  { code: "unit_sale_price", value: "200" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "10" },
                                  { code: "max_pack_size", value: "" },
                                  { code: "unit_sale_price", value: "175" },
                                ],
                              },
                            ],
                          },
                        ],
                        offers: [
                          {
                            id: "offer-1",
                            descriptor: {
                              name: "Scarf",
                              code: "FREEBIE",
                              short_desc: "Scarf",
                              long_desc: "Scarf",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                            },
                            location_ids: [],
                            category_ids: [],
                            item_ids: [],
                            time: {
                              label: "validity",
                              range: {
                                start: "2023-01-08T00:00:00.000Z",
                                end: "2023-01-15T00:00:00.000Z",
                              },
                            },
                          },
                        ],
                        fulfillments: [
                          {
                            contact: {
                              phone: "9886098860",
                              email: "abc@xyz.com",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Return the catalog for Electronics products",
              description: "Return the catalog for Electronics products",
              value: {
                context: {
                  domain: "ONDC:RET14",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/electronics",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/electronics",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  catalog: {
                    fulfillments: [
                      { id: "1", type: "Delivery" },
                      { id: "2", type: "Self-Pickup" },
                    ],
                    payments: [
                      { id: "1", type: "PRE-FULFILLMENT" },
                      { id: "2", type: "ON-FULFILLMENT" },
                      { id: "3", type: "POST-FULFILLMENT" },
                    ],
                    descriptor: {
                      name: "ABC store",
                      short_desc: "Online eCommerce Store",
                      long_desc: "Online eCommerce Store",
                      images: [{ url: "https://abc.com/images/1-shop-img" }],
                    },
                    providers: [
                      {
                        id: "P1",
                        descriptor: {
                          name: "ABC store",
                          code: "P001",
                          short_desc: "ABC store",
                          long_desc: "ABC store",
                          additional_desc: {
                            url: "chat link",
                            content_type: "text/html",
                          },
                          images: [
                            { url: "https://abc.com/images/1-shop-img" },
                          ],
                        },
                        rating: "4.4",
                        ttl: "PT1D",
                        locations: [
                          {
                            id: "L1",
                            gps: "12.967555,77.749666",
                            address: "Jayanagar 4th Block",
                            city: { code: "std:080", name: "Bengaluru" },
                            state: { code: "KA" },
                            country: { code: "IND" },
                            area_code: "560076",
                          },
                        ],
                        creds: [
                          {
                            id: "ESG-12345678",
                            type: "License",
                            desc: "Export License No. ESG-12345678",
                            url: "https://abcd.cdn.com/images/license-img",
                          },
                        ],
                        tags: [
                          {
                            code: "serviceability",
                            list: [
                              { code: "location", value: "L1" },
                              { code: "category", value: "RET10-1042" },
                              { code: "type", value: "12" },
                              { code: "val", value: "SGP" },
                              { code: "unit", value: "country" },
                            ],
                          },
                          {
                            code: "seller_terms",
                            list: [{ code: "gst_credit_invoice", value: "Y" }],
                          },
                          {
                            code: "seller_id",
                            list: [
                              { code: "seller_id_code", value: "gst" },
                              {
                                code: "seller_id_no",
                                value: "xxxxxxxxxxxxxxx",
                              },
                            ],
                          },
                        ],
                        categories: [
                          {
                            id: "V1",
                            descriptor: { name: "Variant Group 1" },
                            tags: [
                              {
                                code: "type",
                                list: [
                                  { code: "type", value: "variant_group" },
                                ],
                              },
                              {
                                code: "attr",
                                list: [
                                  {
                                    code: "name",
                                    value: "item.tags.attribute.colour",
                                  },
                                  { code: "seq", value: "1" },
                                ],
                              },
                              {
                                code: "attr",
                                list: [
                                  {
                                    code: "name",
                                    value: "item.tags.attribute.storage",
                                  },
                                  { code: "seq", value: "2" },
                                ],
                              },
                            ],
                          },
                        ],
                        items: [
                          {
                            id: "I1",
                            parent_item_id: "V1",
                            descriptor: {
                              name: "Apple Iphone 14",
                              code: "UPC / EAN code",
                              short_desc: "Apple Iphone 14",
                              long_desc: "Apple Iphone 14",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                              media: [
                                {
                                  mimetype: "video/mp4",
                                  url: "https://abc.com/images/207.mp4",
                                },
                              ],
                            },
                            creator: {
                              descriptor: {
                                name: "Iphone",
                                contact: {
                                  name: "Raj Kumar",
                                  address: { full: "Iphone Ltd., Delhi" },
                                  phone: "18001801018",
                                  email: "consumer.services@abc.com",
                                },
                              },
                            },
                            price: {
                              currency: "INR",
                              value: "300.00",
                              offered_value: "250.00",
                              maximum_value: "350.00",
                            },
                            quantity: {
                              unitized: {
                                measure: { unit: "unit", value: "1" },
                              },
                              available: {
                                measure: { unit: "unit", value: "1" },
                                count: "2000",
                              },
                              maximum: {
                                measure: { unit: "unit", value: "1" },
                                count: "4000",
                              },
                            },
                            category_ids: ["RET14-1042"],
                            fulfillment_ids: ["1"],
                            location_ids: ["L1"],
                            payment_ids: ["2"],
                            "add-ons": [
                              {
                                id: "78787723",
                                descriptor: {
                                  name: "Iphone Cover",
                                  short_desc: "Iphone Cover",
                                  long_desc: "Iphone Cover",
                                  images: [
                                    { url: "https://abc.com/images/208.png" },
                                  ],
                                },
                                price: {
                                  currency: "INR",
                                  value: "170.0",
                                  offered_value: "100.0",
                                  maximum_value: "170.0",
                                },
                              },
                            ],
                            cancellation_terms: [
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Pending" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Packed" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Order-delivered" },
                                },
                                return_policy: {
                                  return_eligible: "true",
                                  return_within: "P7D",
                                  fulfillment_managed_by: "seller",
                                  return_location: {
                                    address: "RTO address",
                                    gps: "12.667555,77.349666",
                                  },
                                },
                              },
                            ],
                            replacement_terms: [{ replace_within: "P7D" }],
                            time: {
                              label: "validity",
                              range: {
                                start: "2022-12-24T00:00:00.000Z",
                                end: "2022-12-31T00:00:00.000Z",
                              },
                            },
                            matched: "true",
                            recommended: "true",
                            tags: [
                              {
                                code: "origin",
                                list: [{ code: "country", value: "IND" }],
                              },
                              {
                                code: "image",
                                list: [
                                  { code: "type", value: "back_image" },
                                  {
                                    code: "url",
                                    value:
                                      "https://sellerNP.com/images/i1_back_image.png",
                                  },
                                ],
                              },
                              {
                                code: "attribute",
                                list: [
                                  { code: "brand", value: "Samsung" },
                                  {
                                    code: "model",
                                    value: "Galaxy Bean Buds Live",
                                  },
                                  { code: "colour", value: "mystic black" },
                                  { code: "connectivity", value: "wireless" },
                                  { code: "form_factor", value: "In Ear" },
                                  { code: "size", value: "128GB" },
                                  { code: "style", value: "Modern" },
                                  { code: "screen_size", value: '1.99"' },
                                  { code: "memory", value: "8GB" },
                                  { code: "cpu", value: "Core M family" },
                                  { code: "cpu_mfr", value: "Intel" },
                                  { code: "storage", value: "256GB" },
                                  { code: "os", value: "Windows 11" },
                                  {
                                    code: "includes",
                                    value:
                                      "Desktop, User Manual, Warranty Card",
                                  },
                                  {
                                    code: "compatible_devices",
                                    value:
                                      "PC, MAC, Laptop, Smartphone, Tablet",
                                  },
                                  { code: "type", value: "wireless" },
                                  {
                                    code: "special_feature",
                                    value: "wireless,laser",
                                  },
                                  { code: "display", value: "1920x1080px" },
                                  { code: "refresh", value: "60Hz" },
                                ],
                              },
                              {
                                code: "g2",
                                list: [
                                  { code: "time_to_ship", value: "P1D" },
                                  { code: "tax_rate", value: "12" },
                                ],
                              },
                              {
                                code: "g3",
                                list: [
                                  { code: "brand", value: "Dhara" },
                                  { code: "pack_size", value: "5" },
                                  { code: "num_price_slabs", value: "3" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "1" },
                                  { code: "max_pack_size", value: "4" },
                                  { code: "unit_sale_price", value: "250" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "5" },
                                  { code: "max_pack_size", value: "9" },
                                  { code: "unit_sale_price", value: "200" },
                                ],
                              },
                              {
                                code: "price_slab",
                                list: [
                                  { code: "min_pack_size", value: "10" },
                                  { code: "max_pack_size", value: "" },
                                  { code: "unit_sale_price", value: "175" },
                                ],
                              },
                            ],
                          },
                        ],
                        fulfillments: [
                          {
                            contact: {
                              phone: "9886098860",
                              email: "abc@xyz.com",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Return the catalog for grocery",
              description: "Return the catalog for grocery products",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_search",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  catalog: {
                    fulfillments: [
                      { id: "1", type: "Delivery" },
                      { id: "2", type: "Self-Pickup" },
                    ],
                    payments: [
                      { id: "1", type: "PRE-FULFILLMENT" },
                      { id: "2", type: "ON-FULFILLMENT" },
                      { id: "3", type: "POST-FULFILLMENT" },
                    ],
                    descriptor: {
                      name: "ABC store",
                      short_desc: "Online eCommerce Store",
                      long_desc: "Online eCommerce Store",
                      images: [{ url: "https://abc.com/images/1-shop-img" }],
                    },
                    providers: [
                      {
                        id: "P1",
                        descriptor: {
                          name: "ABC store",
                          code: "P001",
                          short_desc: "ABC store",
                          long_desc: "ABC store",
                          additional_desc: {
                            url: "chat link",
                            content_type: "text/html",
                          },
                          images: [
                            { url: "https://abc.com/images/1-shop-img" },
                          ],
                        },
                        rating: "4.4",
                        ttl: "PT1D",
                        locations: [
                          {
                            id: "L1",
                            gps: "12.967555,77.749666",
                            address: "Jayanagar 4th Block",
                            city: { code: "std:080", name: "Bengaluru" },
                            state: { code: "KA" },
                            country: { code: "IND" },
                            area_code: "560076",
                          },
                        ],
                        tags: [
                          {
                            descriptor: { code: "serviceability" },
                            list: [
                              { descriptor: { code: "location" }, value: "L1" },
                              {
                                descriptor: { code: "category" },
                                value: "RET10-1042",
                              },
                              { descriptor: { code: "type" }, value: "12" },
                              { descriptor: { code: "val" }, value: "IND" },
                              {
                                descriptor: { code: "unit" },
                                value: "country",
                              },
                            ],
                          },
                          {
                            descriptor: { code: "seller_terms" },
                            list: [
                              {
                                descriptor: { code: "gst_credit_invoice" },
                                value: "Y",
                              },
                            ],
                          },
                          {
                            descriptor: { code: "seller_id" },
                            list: [
                              {
                                descriptor: { code: "seller_id_code" },
                                value: "gst",
                              },
                              {
                                descriptor: { code: "seller_id_no" },
                                value: "xxxxxxxxxxxxxxx",
                              },
                            ],
                          },
                        ],
                        categories: [
                          {
                            id: "V1",
                            descriptor: { name: "Variant Group 1" },
                            tags: [
                              {
                                descriptor: { code: "type" },
                                list: [
                                  {
                                    descriptor: { code: "type" },
                                    value: "variant_group",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "attr" },
                                list: [
                                  {
                                    descriptor: { code: "name" },
                                    value: "item.tags.attribute.colour",
                                  },
                                  { descriptor: { code: "seq" }, value: "1" },
                                ],
                              },
                              {
                                descriptor: { code: "attr" },
                                list: [
                                  {
                                    descriptor: { code: "name" },
                                    value: "item.tags.attribute.size",
                                  },
                                  { descriptor: { code: "seq" }, value: "2" },
                                ],
                              },
                            ],
                          },
                        ],
                        items: [
                          {
                            id: "I1",
                            parent_item_id: "V1",
                            descriptor: {
                              name: "Dhara Mustard Oil",
                              code: "UPC / EAN code",
                              short_desc: "Dhara refined mustard oil",
                              long_desc: "Dhara refined mustard oil",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                              media: [
                                { mimetype: "video/mp4", url: "video_url" },
                              ],
                            },
                            creator: {
                              descriptor: {
                                name: "Mother Dairy",
                                contact: {
                                  name: "Raj Kumar",
                                  address: {
                                    full: "Mother Dairy Fruit & Vegetable Pvt Ltd,A-3, NDDB House, Sector-1, Noida,Uttar Pradesh-201301",
                                  },
                                  phone: "18001801018",
                                  email: "consumer.services@motherdairy.com",
                                },
                              },
                            },
                            price: {
                              currency: "INR",
                              value: "300.00",
                              offered_value: "250.00",
                              maximum_value: "350.00",
                            },
                            quantity: {
                              unitized: {
                                measure: { unit: "millilitre", value: "500" },
                              },
                              available: {
                                measure: { unit: "millilitre", value: "500" },
                                count: "2000",
                              },
                              maximum: {
                                measure: { unit: "millilitre", value: "500" },
                                count: "4000",
                              },
                            },
                            category_ids: ["RET10-1042"],
                            fulfillment_ids: ["1"],
                            location_ids: ["L1"],
                            payment_ids: ["2"],
                            "add-ons": [
                              {
                                id: "78787723",
                                descriptor: {
                                  name: "Dhara Sunflower Oil",
                                  short_desc: "Dhara Sunflower Oil",
                                  long_desc: "Dhara Sunflower Oil",
                                  images: [
                                    { url: "https://abc.com/images/208.png" },
                                  ],
                                },
                                price: {
                                  currency: "INR",
                                  value: "170.0",
                                  offered_value: "100.0",
                                  maximum_value: "170.0",
                                },
                              },
                            ],
                            cancellation_terms: [
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Pending" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Packed" },
                                },
                                refund_eligible: "true",
                              },
                              {
                                fulfillment_state: {
                                  descriptor: { code: "Order-delivered" },
                                },
                                return_policy: {
                                  return_eligible: "true",
                                  return_within: "P7D",
                                  fulfillment_managed_by: "seller",
                                  return_location: {
                                    address: "RTO address",
                                    gps: "12.667555,77.349666",
                                  },
                                },
                              },
                            ],
                            replacement_terms: [{ replace_within: "P7D" }],
                            time: {
                              label: "validity",
                              range: {
                                start: "2022-12-24T00:00:00.000Z",
                                end: "2022-12-31T00:00:00.000Z",
                              },
                            },
                            matched: "true",
                            recommended: "true",
                            tags: [
                              {
                                descriptor: { code: "origin" },
                                list: [
                                  {
                                    descriptor: { code: "country" },
                                    value: "IND",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "image" },
                                list: [
                                  {
                                    descriptor: { code: "type" },
                                    value: "back_image",
                                  },
                                  {
                                    descriptor: { code: "url" },
                                    value:
                                      "https://sellerNP.com/images/i1_back_image.png",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "veg_nonveg" },
                                list: [
                                  { descriptor: { code: "veg" }, value: "yes" },
                                ],
                              },
                              {
                                descriptor: { code: "g2" },
                                list: [
                                  {
                                    descriptor: { code: "time_to_ship" },
                                    value: "P1D",
                                  },
                                  {
                                    descriptor: { code: "tax_rate" },
                                    value: "12",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "g3" },
                                list: [
                                  {
                                    descriptor: { code: "brand" },
                                    value: "Dhara",
                                  },
                                  {
                                    descriptor: { code: "pack_size" },
                                    value: "5",
                                  },
                                  {
                                    descriptor: { code: "num_price_slabs" },
                                    value: "3",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "price_slab" },
                                list: [
                                  {
                                    descriptor: { code: "min_pack_size" },
                                    value: "1",
                                  },
                                  {
                                    descriptor: { code: "max_pack_size" },
                                    value: "4",
                                  },
                                  {
                                    descriptor: { code: "unit_sale_price" },
                                    value: "250",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "price_slab" },
                                list: [
                                  {
                                    descriptor: { code: "min_pack_size" },
                                    value: "5",
                                  },
                                  {
                                    descriptor: { code: "max_pack_size" },
                                    value: "9",
                                  },
                                  {
                                    descriptor: { code: "unit_sale_price" },
                                    value: "200",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "price_slab" },
                                list: [
                                  {
                                    descriptor: { code: "min_pack_size" },
                                    value: "10",
                                  },
                                  {
                                    descriptor: { code: "max_pack_size" },
                                    value: "",
                                  },
                                  {
                                    descriptor: { code: "unit_sale_price" },
                                    value: "175",
                                  },
                                ],
                              },
                              {
                                descriptor: { code: "FSSAI_LICENSE_NO" },
                                list: [
                                  {
                                    descriptor: { code: "BRAND_OWNER" },
                                    value: "12345678901234",
                                  },
                                  {
                                    descriptor: { code: "OTHER" },
                                    value: "12345678901234",
                                  },
                                  {
                                    descriptor: { code: "IMPORTER" },
                                    value: "12345678901234",
                                  },
                                ],
                              },
                            ],
                          },
                        ],
                        offers: [
                          {
                            id: "offer-1",
                            descriptor: {
                              name: "Dhara Olive Oil",
                              code: "FREEBIE",
                              short_desc: "Dhara Olive Oil",
                              long_desc: "Dhara Olive Oil",
                              images: [
                                { url: "https://abc.com/images/207.png" },
                              ],
                            },
                            location_ids: [],
                            category_ids: [],
                            item_ids: [],
                            time: {
                              label: "validity",
                              range: {
                                start: "2023-01-08T00:00:00.000Z",
                                end: "2023-01-15T00:00:00.000Z",
                              },
                            },
                          },
                        ],
                        fulfillments: [
                          {
                            contact: {
                              phone: "9886098860",
                              email: "abc@xyz.com",
                            },
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_select: {
          examples: [
            {
              summary: "Send quote and breakup",
              description:
                "Send quote and breakup for items selected in select call.",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_select",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: { id: "P1" },
                    items: [{ fulfillment_ids: ["F1"], id: "I1" }],
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        tracking: false,
                        "@ondc/org/category": "Express Delivery",
                        "@ondc/org/TAT": "P7D",
                        state: { descriptor: { code: "Serviceable" } },
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: {
                            quantity: {
                              available: { count: "200" },
                              maximum: { count: "200" },
                            },
                            price: { currency: "INR", value: "250" },
                          },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                      ],
                      ttl: "P1D",
                    },
                  },
                },
              },
            },
          ],
        },
        on_init: {
          examples: [
            {
              summary: "Respond to RFQ",
              description: "Respond to RFQ",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_init",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: { id: "P1" },
                    provider_location: { id: "L1" },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address:
                        "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                      state: { name: "Karnataka" },
                      city: { name: "Bengaluru" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        type: "Delivery",
                        "@ondc/org/provider_name": "Loadshare",
                        "@ondc/org/category": "Express Delivery",
                        "@ondc/org/TAT": "P7D",
                        tracking: false,
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "12.974002,77.613458",
                              address: "My House #, My buildin",
                              city: { name: "Bengaluru" },
                              country: { code: "IND" },
                              area_code: "560001",
                              state: { name: "Karnataka" },
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            beneficiary_name: "xxxxx",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Respond to RFQ",
              description: "Respond to RFQ",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_init",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    provider: { id: "P1" },
                    provider_location: { id: "L1" },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        type: "Delivery",
                        "@ondc/org/provider_name": "Loadshare",
                        "@ondc/org/category": "Express Delivery",
                        "@ondc/org/TAT": "P7D",
                        tracking: false,
                        stops: [
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                        tags: [
                          {
                            descriptor: { code: "DELIVERY_TERMS" },
                            list: [
                              {
                                descriptor: { code: "INCOTERMS" },
                                value: "CIF",
                              },
                              {
                                descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                                value: "SGP",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            beneficiary_name: "xxxxx",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
        on_confirm: {
          examples: [
            {
              summary: "Accept PO",
              description: "PO acceptance by Seller",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_confirm",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Accepted",
                    provider: {
                      id: "P1",
                      locations: [{ id: "L1" }],
                      rateable: true,
                    },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address:
                        "22, Mahatma Gandhi Rd, Craig Park Layout, Ashok Nagar, Bengaluru, Karnataka 560001",
                      state: { name: "Karnataka" },
                      city: { name: "Bengaluru" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        state: { descriptor: { code: "Pending" } },
                        type: "Delivery",
                        tracking: false,
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: { name: "ABC Store" },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Status for pickup",
                              short_desc: "Pickup Confirmation Code",
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "12.974002,77.613458",
                              address: "My House #, My buildin",
                              city: { name: "Bengaluru" },
                              country: { code: "IND" },
                              area_code: "560001",
                              state: { name: "Karnataka" },
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                        rateable: true,
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "NOT-PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "seller-app",
                            settlement_phase: "sale-amount",
                            beneficiary_name: "xxxxx",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T09:31:30.000Z",
                  },
                },
              },
            },
            {
              summary: "Accept PO",
              description: "PO acceptance by Seller",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:999" },
                    country: { code: "IND" },
                  },
                  action: "on_confirm",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Accepted",
                    provider: {
                      id: "P1",
                      locations: [{ id: "L1" }],
                      rateable: true,
                    },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                        "add-ons": [{ id: "78787723" }],
                        tags: [
                          {
                            descriptor: { code: "BUYER_TERMS" },
                            list: [
                              {
                                descriptor: { code: "ITEM_REQ" },
                                value: "free text on Item Customization",
                              },
                              {
                                descriptor: { code: "PACKAGING_REQ" },
                                value: "free text on packaging Customization",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      tax_id: "XXXXXXXXXXXXXXX",
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        state: { descriptor: { code: "Pending" } },
                        type: "Delivery",
                        tracking: false,
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: { name: "ABC Store" },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Status for pickup",
                              short_desc: "Pickup Confirmation Code",
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                        rateable: true,
                        tags: [
                          {
                            descriptor: { code: "DELIVERY_TERMS" },
                            list: [
                              {
                                descriptor: { code: "INCOTERMS" },
                                value: "CIF",
                              },
                              {
                                descriptor: { code: "NAMED_PLACE_OF_DELIVERY" },
                                value: "SGP",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "NOT-PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "seller-app",
                            settlement_phase: "sale-amount",
                            beneficiary_name: "xxxxx",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    tags: [
                      {
                        descriptor: { code: "buyer_id" },
                        list: [
                          {
                            descriptor: { code: "buyer_id_code" },
                            value: "gst",
                          },
                          {
                            descriptor: { code: "buyer_id_no" },
                            value: "xxxxxxxxxxxxxxx",
                          },
                        ],
                      },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T09:31:30.000Z",
                  },
                },
              },
            },
          ],
        },
        on_status: {
          examples: [
            {
              summary: "Seller updates the order status and shares Invoice",
              description: "Seller updates the order status and shares Invoice",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_status",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Accepted",
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        type: "Delivery",
                        tracking: false,
                        state: { descriptor: { code: "Pending" } },
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: {
                                name: "ABC Store",
                                images: ["https://gf-integration/images/5.png"],
                              },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Proof of pickup",
                              short_desc: "Proof of pickup details",
                              long_desc: "Proof of pickup details",
                              images: ["https://image1_url.png"],
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            time: {
                              range: {
                                start: "2023-02-03T11:00:00.000Z",
                                end: "2023-02-03T11:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Proof of delivery",
                              short_desc: "Proof of delivery details",
                              long_desc: "Proof of delivery details",
                              images: ["https://image1_url.png"],
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "NOT-PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "3",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "seller-app",
                            settlement_phase: "sale-amount",
                            beneficiary_name: "xxxxx",
                            settlement_reference: "XXXX",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    documents: [
                      { url: "https://invoice_url", label: "PROFORMA_INVOICE" },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T10:00:00.201Z",
                  },
                },
              },
            },
            {
              summary: "Seller updates the order status and shares Invoice",
              description: "Seller updates the order status and shares Invoice",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_status",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "In-progress",
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        type: "Delivery",
                        tracking: false,
                        state: { descriptor: { code: "Order-picked-up" } },
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: {
                                name: "ABC Store",
                                images: ["https://gf-integration/images/5.png"],
                              },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                              timestamp: "2023-02-03T10:25:00.000Z",
                            },
                            instructions: {
                              name: "Proof of pickup",
                              short_desc: "Proof of pickup details",
                              long_desc: "Proof of pickup details",
                              images: ["https://image1_url.png"],
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            time: {
                              range: {
                                start: "2023-02-03T11:00:00.000Z",
                                end: "2023-02-03T11:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Proof of delivery",
                              short_desc: "Proof of delivery details",
                              long_desc: "Proof of delivery details",
                              images: ["https://image1_url.png"],
                            },
                            contact: { phone: "9886098860" },
                            agent: {
                              person: { name: "Ramu" },
                              contact: { phone: "9886098860" },
                            },
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        uri: "https://ondc.transaction.com/payment",
                        tl_method: "http/get",
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "3",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "seller-app",
                            settlement_phase: "sale-amount",
                            beneficiary_name: "xxxxx",
                            settlement_reference: "XXXX",
                            settlement_status: "PAID",
                            settlement_timestamp: "2023-02-04T10:00:00.000Z",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T10:00:00.201Z",
                  },
                },
              },
            },
            {
              summary: "Seller updates the order status and shares Invoice",
              description: "Seller updates the order status and shares Invoice",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_status",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "In-progress",
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        type: "Delivery",
                        tracking: false,
                        state: { descriptor: { code: "Out-for-delivery" } },
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: {
                                name: "ABC Store",
                                images: ["https://gf-integration/images/5.png"],
                              },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                              timestamp: "2023-02-03T10:25:00.000Z",
                            },
                            instructions: {
                              name: "Proof of pickup",
                              short_desc: "Proof of pickup details",
                              long_desc: "Proof of pickup details",
                              images: ["https://image1_url.png"],
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            time: {
                              range: {
                                start: "2023-02-03T11:00:00.000Z",
                                end: "2023-02-03T11:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Proof of delivery",
                              short_desc: "Proof of delivery details",
                              long_desc: "Proof of delivery details",
                              images: ["https://image1_url.png"],
                            },
                            contact: { phone: "9886098860" },
                            agent: {
                              person: { name: "Ramu" },
                              contact: { phone: "9886098860" },
                            },
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        uri: "https://ondc.transaction.com/payment",
                        tl_method: "http/get",
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "3",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "seller-app",
                            settlement_phase: "sale-amount",
                            beneficiary_name: "xxxxx",
                            settlement_reference: "XXXX",
                            settlement_status: "PAID",
                            settlement_timestamp: "2023-02-04T10:00:00.000Z",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T10:00:00.201Z",
                  },
                },
              },
            },
            {
              summary: "Seller updates the order status and shares Invoice",
              description: "Seller updates the order status and shares Invoice",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_status",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Completed",
                    provider: { id: "P1", locations: [{ id: "L1" }] },
                    items: [
                      {
                        id: "I1",
                        fulfillment_ids: ["F1"],
                        quantity: { selected: { count: 200 } },
                      },
                    ],
                    billing: {
                      name: "ONDC buyer",
                      address: "B005 aaspire heights, Jurong East, SGP, 680230",
                      state: { name: "Jurong East" },
                      city: { name: "Jurong East" },
                      email: "nobody@nomail.com",
                      phone: "9886098860",
                    },
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        type: "Delivery",
                        tracking: false,
                        state: { descriptor: { code: "Order-delivered" } },
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: {
                                name: "ABC Store",
                                images: ["https://gf-integration/images/5.png"],
                              },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                              timestamp: "2023-02-03T10:25:00.000Z",
                            },
                            instructions: {
                              name: "Proof of pickup",
                              short_desc: "Proof of pickup details",
                              long_desc: "Proof of pickup details",
                              images: ["https://image1_url.png"],
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            time: {
                              range: {
                                start: "2023-02-03T11:00:00.000Z",
                                end: "2023-02-03T11:30:00.000Z",
                              },
                              timestamp: "2023-02-03T11:35:00.000Z",
                            },
                            instructions: {
                              name: "Proof of delivery",
                              short_desc: "Proof of delivery details",
                              long_desc: "Proof of delivery details",
                              images: ["https://image1_url.png"],
                            },
                            contact: { phone: "9886098860" },
                            agent: {
                              person: { name: "Ramu" },
                              contact: { phone: "9886098860" },
                            },
                          },
                        ],
                      },
                    ],
                    quote: {
                      price: { currency: "INR", value: "53600" },
                      breakup: [
                        {
                          "@ondc/org/item_id": "I1",
                          "@ondc/org/item_quantity": { count: 200 },
                          title: "Dhara Mustard Oil",
                          "@ondc/org/title_type": "item",
                          price: { currency: "INR", value: "50000" },
                          item: { price: { currency: "INR", value: "250" } },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Delivery charges",
                          "@ondc/org/title_type": "delivery",
                          price: { currency: "INR", value: "4000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Packing charges",
                          "@ondc/org/title_type": "packing",
                          price: { currency: "INR", value: "500" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Tax",
                          "@ondc/org/title_type": "tax",
                          price: { currency: "INR", value: "0" },
                        },
                        {
                          "@ondc/org/item_id": "I1",
                          title: "Discount",
                          "@ondc/org/title_type": "discount",
                          price: { currency: "INR", value: "-1000" },
                        },
                        {
                          "@ondc/org/item_id": "F1",
                          title: "Convenience Fee",
                          "@ondc/org/title_type": "misc",
                          price: { currency: "INR", value: "100" },
                        },
                      ],
                      ttl: "P1D",
                    },
                    payments: [
                      {
                        uri: "https://ondc.transaction.com/payment",
                        tl_method: "http/get",
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BAP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "3",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "seller-app",
                            settlement_phase: "sale-amount",
                            beneficiary_name: "xxxxx",
                            settlement_reference: "XXXX",
                            settlement_status: "PAID",
                            settlement_timestamp: "2023-02-04T10:00:00.000Z",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    documents: [
                      { url: "https://invoice_url", label: "Invoice" },
                    ],
                    created_at: "2023-02-03T09:30:00.000Z",
                    updated_at: "2023-02-03T10:00:00.201Z",
                  },
                },
              },
            },
          ],
        },
        on_update: {
          examples: [
            {
              summary: "Seller updating the payment status",
              description:
                "Seller updating the payment status (CollectedBy BPP)",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_update",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Accepted",
                    provider: { id: "P1" },
                    items: [
                      { id: "I1", quantity: { selected: { count: 200 } } },
                    ],
                    payments: [
                      {
                        uri: "https://ondc.transaction.com/payment",
                        tl_method: "http/get",
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            beneficiary_name: "xxxxx",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
            {
              summary: "Single PO - Multiple Fulfillment",
              description: "Single PO - Multiple Fulfillment",
              value: {
                context: {
                  domain: "ONDC:RET10",
                  location: {
                    city: { code: "std:080" },
                    country: { code: "IND" },
                  },
                  action: "on_update",
                  version: "2.0.1",
                  bap_id: "buyerapp.com",
                  bap_uri: "https://buyerapp.com/grocery",
                  bpp_id: "sellerapp.com",
                  bpp_uri: "https://sellerapp.com/grocery",
                  transaction_id: "T1",
                  message_id: "M1",
                  timestamp: "2023-01-08T22:00:30.000Z",
                  ttl: "PT30S",
                },
                message: {
                  order: {
                    id: "O1",
                    state: "Accepted",
                    provider: { id: "P1" },
                    items: [
                      {
                        id: "I1",
                        quantity: { selected: { count: 200 } },
                        fulfillment_ids: ["F1", "F2"],
                      },
                    ],
                    payments: [
                      {
                        uri: "https://ondc.transaction.com/payment",
                        tl_method: "http/get",
                        params: {
                          currency: "INR",
                          transaction_id: "3937",
                          amount: "53600",
                        },
                        status: "PAID",
                        type: "PRE-FULFILLMENT",
                        collected_by: "BPP",
                        "@ondc/org/buyer_app_finder_fee_type": "percent",
                        "@ondc/org/buyer_app_finder_fee_amount": "0",
                        "@ondc/org/settlement_details": [
                          {
                            settlement_counterparty: "buyer-app",
                            settlement_phase: "sale-amount",
                            settlement_type: "upi",
                            upi_address: "gft@oksbi",
                            settlement_bank_account_no: "XXXXXXXXXX",
                            settlement_ifsc_code: "XXXXXXXXX",
                            beneficiary_name: "xxxxx",
                            bank_name: "xxxx",
                            branch_name: "xxxx",
                          },
                        ],
                      },
                    ],
                    fulfillments: [
                      {
                        id: "F1",
                        "@ondc/org/provider_name": "Loadshare",
                        state: { descriptor: { code: "Pending" } },
                        type: "Delivery",
                        tracking: false,
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: { name: "ABC Store" },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Status for pickup",
                              short_desc: "Pickup Confirmation Code",
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            time: {
                              range: {
                                start: "2023-02-07T11:00:00.000Z",
                                end: "2023-02-07T11:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Status for drop",
                              short_desc: "Delivery Confirmation Code",
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                        rateable: true,
                        tags: [
                          {
                            descriptor: { code: "ITEM_DETAILS" },
                            list: [
                              { descriptor: { code: "ITEM_ID" }, value: "I1" },
                              { descriptor: { code: "COUNT" }, value: "100" },
                              {
                                descriptor: { code: "MEASURE_UNIT" },
                                value: "millilitre",
                              },
                              {
                                descriptor: { code: "MEASURE_VALUE" },
                                value: "500",
                              },
                            ],
                          },
                        ],
                      },
                      {
                        id: "F2",
                        "@ondc/org/provider_name": "Loadshare",
                        state: { descriptor: { code: "Pending" } },
                        type: "Delivery",
                        tracking: false,
                        stops: [
                          {
                            type: "start",
                            location: {
                              id: "L1",
                              descriptor: { name: "ABC Store" },
                              gps: "12.956399,77.636803",
                            },
                            time: {
                              range: {
                                start: "2023-02-03T10:00:00.000Z",
                                end: "2023-02-03T10:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Status for pickup",
                              short_desc: "Pickup Confirmation Code",
                            },
                            contact: {
                              phone: "9886098860",
                              email: "nobody@nomail.com",
                            },
                          },
                          {
                            type: "end",
                            location: {
                              gps: "1.3806217468119772, 103.74636438437074",
                              address: "My House #, My buildin",
                              city: { name: "Jurong East" },
                              country: { code: "SGP" },
                              area_code: "680230",
                              state: { name: "" },
                            },
                            time: {
                              range: {
                                start: "2023-02-07T11:00:00.000Z",
                                end: "2023-02-07T11:30:00.000Z",
                              },
                            },
                            instructions: {
                              name: "Status for drop",
                              short_desc: "Delivery Confirmation Code",
                            },
                            contact: { phone: "9886098860" },
                          },
                        ],
                        rateable: true,
                        tags: [
                          {
                            descriptor: { code: "ITEM_DETAILS" },
                            list: [
                              { descriptor: { code: "ITEM_ID" }, value: "I1" },
                              { descriptor: { code: "COUNT" }, value: "100" },
                              {
                                descriptor: { code: "MEASURE_UNIT" },
                                value: "millilitre",
                              },
                              {
                                descriptor: { code: "MEASURE_VALUE" },
                                value: "500",
                              },
                            ],
                          },
                        ],
                      },
                    ],
                  },
                },
              },
            },
          ],
        },
      },
    },
  },
  "x-attributes": {
    B2B: {
      attribute_set: {
        search: {
          message: {
            intent: {
              fulfillment: {
                location: {
                  area_code: {
                    required: "optional",
                    reference: "if any",
                    usage: 560001,
                    description: "Area code",
                  },
                  gps: {
                    required: "mandatory",
                    reference: "if any",
                    usage: "12.974002,77.613458",
                    description: "Gps",
                  },
                },
                type: {
                  required: "optional",
                  reference: "if any",
                  usage: "Delivery",
                  description: "Type of fulfillment",
                },
              },
              item: {
                category: {
                  required: "optional",
                  reference: "if any",
                  usage: "Foodgrains",
                  description: "Category of item",
                },
              },
              tags: {
                buyer_id: {
                  required: "mandatory",
                  reference: "if any",
                  usage: "xxxxxxxxxxxxxxx",
                  description: "Category of item",
                },
              },
            },
          },
        },
        on_search: {
          message: {
            catalog: {
              descriptor: {
                name: {
                  required: "mandatory",
                  description:
                    "Physical description of name value for something.",
                  reference: "if any",
                  usage: "ABC store",
                },
                short_desc: {
                  required: "optional",
                  description: "Short description of value for something.",
                  reference: "if any",
                  usage: "Online eCommerce Store",
                },
                long_desc: {
                  required: "optional",
                  description: "Long description of value for something.",
                  reference: "if any",
                  usage: "Online eCommerce Store",
                },
                images: {
                  url: {
                    required: "mandatory",
                    description: "Physical description of the item",
                    reference: "if any",
                    usage: "https://abc.com/images/1-shop-img",
                  },
                },
              },
              providers: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
                descriptor: {
                  name: {
                    required: "mandatory",
                    description:
                      "Physical description of name value for something.",
                    reference: "if any",
                    usage: "ABC store",
                  },
                  short_desc: {
                    required: "optional",
                    description: "Short description of value for something.",
                    reference: "if any",
                    usage: "Online eCommerce Store",
                  },
                  long_desc: {
                    required: "optional",
                    description: "Long description of value for something.",
                    reference: "if any",
                    usage: "Online eCommerce Store",
                  },
                  images: {
                    url: {
                      required: "mandatory",
                      description: "Physical description of the item",
                      reference: "if any",
                      usage: "https://abc.com/images/1-shop-img",
                    },
                  },
                },
                additional_desc: {
                  required: "optional",
                  description: "Additional description",
                  reference: "if any",
                  usage: "chat link",
                },
                creds: {
                  id: {
                    required: "optional",
                    description: "Human readable id",
                    reference: "if any",
                    usage: "ESG-12345678",
                  },
                  type: {
                    required: "optional",
                    description: "Type of creds",
                    reference: "if any",
                    usage: "License",
                  },
                  desc: {
                    required: "optional",
                    description: "Description of creds",
                    reference: "if any",
                    usage: "Export License No. ESG-12345678",
                  },
                  url: {
                    required: "optional",
                    description: "Physical description",
                    reference: "if any",
                    usage: "https://abcd.cdn.com/images/license-img",
                  },
                },
                offers: {
                  required: "optional",
                  description: "Offers info",
                  reference: "if any",
                  usage: "chat link",
                },
              },
              items: {
                tags: {
                  veg_nonveg: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: "veg",
                  },
                  image: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: "veg",
                  },
                  price_slab: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: 175,
                  },
                },
              },
            },
          },
        },
        select: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              payments: {
                type: {
                  required: "optional",
                  description: "type of the payment",
                  reference: "if any",
                  usage: "ON-FULFILLMENT",
                },
              },
            },
          },
        },
        on_select: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
            },
          },
        },
        init: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
                ttl: {
                  required: "optional",
                  description: "ttl",
                  reference: "if any",
                  usage: "P1D",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
                "add-ons": {
                  id: {
                    required: "optional",
                    description: "Id of add-ons",
                    reference: "if any",
                    usage: 78787723,
                  },
                },
                tags: {
                  BUYER_TERMS: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: "free text on Item Customization",
                  },
                },
              },
              fulfillments: {
                customer: {
                  person: {
                    creds: {
                      id: {
                        required: "optional",
                        description: "Human readable id",
                        reference: "if any",
                        usage: "ESG-12345678",
                      },
                      type: {
                        required: "optional",
                        description: "Type of creds",
                        reference: "if any",
                        usage: "License",
                      },
                      desc: {
                        required: "optional",
                        description: "Description of creds",
                        reference: "if any",
                        usage: "Export License No. ESG-12345678",
                      },
                      url: {
                        required: "optional",
                        description: "Physical description",
                        reference: "if any",
                        usage: "https://abcd.cdn.com/images/license-img",
                      },
                    },
                  },
                },
                tags: {
                  DELIVERY_TERMS: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: "CIF",
                  },
                },
              },
              billing: {
                phone: {
                  required: "mandatory",
                  description: "Describes the phone information of an entity",
                  reference: "if any",
                  usage: 9886098860,
                },
                email: {
                  required: "optional",
                  description: "Email address of the contact",
                  reference: "if any",
                  usage: "nobody@nomail.com",
                },
                name: {
                  required: "mandatory",
                  description: "Describes a person name as any individual",
                  reference: "if any",
                  usage: "ONDC buyer",
                },
                tax_id: {
                  required: "mandatory",
                  description: "Describes tax id",
                  reference: "if any",
                  usage: "XXXXXXXXXXXXXXX",
                },
              },
            },
          },
        },
        on_init: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
                "add-ons": {
                  id: {
                    required: "optional",
                    description: "Id of add-ons",
                    reference: "if any",
                    usage: 78787723,
                  },
                },
                tags: {
                  BUYER_TERMS: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: "free text on Item Customization",
                  },
                  DELIVERY_TERMS: {
                    required: "optional",
                    description: "Tags info",
                    reference: "if any",
                    usage: "CIF",
                  },
                },
              },
              billing: {
                phone: {
                  required: "mandatory",
                  description: "Describes the phone information of an entity",
                  reference: "if any",
                  usage: 9886098860,
                },
                email: {
                  required: "optional",
                  description: "Email address of the contact",
                  reference: "if any",
                  usage: "nobody@nomail.com",
                },
                name: {
                  required: "mandatory",
                  description: "Describes a person name as any individual",
                  reference: "if any",
                  usage: "ONDC buyer",
                },
                tax_id: {
                  required: "mandatory",
                  description: "Describes tax id",
                  reference: "if any",
                  usage: "XXXXXXXXXXXXXXX",
                },
              },
            },
          },
        },
        confirm: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              billing: {
                phone: {
                  required: "mandatory",
                  description: "Describes the phone information of an entity",
                  reference: "if any",
                  usage: 9886098860,
                },
                email: {
                  required: "optional",
                  description: "Email address of the contact",
                  reference: "if any",
                  usage: "nobody@nomail.com",
                },
                name: {
                  required: "mandatory",
                  description: "Describes a person name as any individual",
                  reference: "if any",
                  usage: "ONDC buyer",
                },
                tax_id: {
                  required: "mandatory",
                  description: "Describes tax id",
                  reference: "if any",
                  usage: "XXXXXXXXXXXXXXX",
                },
              },
              fulfillments: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID",
                  reference: "if any",
                  usage: "F1",
                },
                time: {
                  required: "optional",
                  description: "Describes the phone information of an entity",
                  reference: "if any",
                  usage: "+91-9897867564",
                },
                contact: {
                  phone: {
                    required: "mandatory",
                    description: "Describes the phone information of an entity",
                    reference: "if any",
                    usage: 919876543210,
                  },
                  email: {
                    required: "mandatory",
                    description: "Email address of the contact",
                    reference: "if any",
                    usage: "alpha.manufacturing@gmail.com",
                  },
                },
                instructions: {
                  required: "optional",
                  description: "The URL of the file",
                  reference: "if any",
                  usage:
                    "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                },
              },
            },
          },
        },
        on_confirm: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              billing: {
                phone: {
                  required: "mandatory",
                  description: "Describes the phone information of an entity",
                  reference: "if any",
                  usage: 9886098860,
                },
                email: {
                  required: "optional",
                  description: "Email address of the contact",
                  reference: "if any",
                  usage: "nobody@nomail.com",
                },
                name: {
                  required: "mandatory",
                  description: "Describes a person name as any individual",
                  reference: "if any",
                  usage: "ONDC buyer",
                },
                tax_id: {
                  required: "mandatory",
                  description: "Describes tax id",
                  reference: "if any",
                  usage: "XXXXXXXXXXXXXXX",
                },
              },
              fulfillments: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID",
                  reference: "if any",
                  usage: "F1",
                },
                time: {
                  required: "optional",
                  description: "Describes the phone information of an entity",
                  reference: "if any",
                  usage: "+91-9897867564",
                },
                contact: {
                  phone: {
                    required: "mandatory",
                    description: "Describes the phone information of an entity",
                    reference: "if any",
                    usage: 919876543210,
                  },
                  email: {
                    required: "mandatory",
                    description: "Email address of the contact",
                    reference: "if any",
                    usage: "alpha.manufacturing@gmail.com",
                  },
                },
                instructions: {
                  required: "optional",
                  description: "The URL of the file",
                  reference: "if any",
                  usage:
                    "https://6vs8xnx5i7.icicibank.co.in/loans/xinput/formid/a23f2fdfbbb8ac402bfd54f",
                },
              },
            },
          },
        },
        update: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
            },
          },
        },
        on_update: {
          message: {
            order: {
              provider: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
              items: {
                id: {
                  required: "mandatory",
                  description: "Unique human readable ID.",
                  reference: "if any",
                  usage: "P1",
                },
              },
            },
          },
        },
      },
    },
  },
};
