import { gql } from '@apollo/client';

export const getAllProduct = gql`
    query getProducts($pageSize: Int, $currentPage: Int) {
        products(
        search: ""
        filter: {category_id: {eq: "12"}, price: {from: "0", to: "784000"}}
        pageSize: $pageSize
        currentPage: $currentPage
        sort: {name: ASC}
        ) {
        page_info {
            current_page
            page_size
            total_pages
            __typename
        }
        total_count
        aggregations {
            attribute_code
            label
            options {
            count
            label
            value
            __typename
            }
            __typename
        }
        __typename
        items {
            id
            sku
            name
            url_key
            stock_status
            short_description {
            html
            __typename
            }
            weltpixel_labels {
            categoryLabel {
                css
                customer_group
                image
                page_position
                position
                priority
                text
                text_padding
                text_bg_color
                text_font_size
                text_font_color
                __typename
            }
            productLabel {
                css
                customer_group
                image
                page_position
                position
                priority
                text
                text_padding
                text_bg_color
                text_font_size
                text_font_color
                __typename
            }
            __typename
            }
            small_image {
            url
            label
            __typename
            }
            categories {
            name
            __typename
            }
            __typename
            price_tiers {
            discount {
                percent_off
                amount_off
                __typename
            }
            final_price {
                currency
                value
                __typename
            }
            quantity
            __typename
            }
            price_range {
            maximum_price {
                discount {
                amount_off
                percent_off
                __typename
                }
                final_price {
                currency
                value
                __typename
                }
                regular_price {
                currency
                value
                __typename
                }
                __typename
            }
            minimum_price {
                discount {
                amount_off
                percent_off
                __typename
                }
                final_price {
                currency
                value
                __typename
                }
                regular_price {
                currency
                value
                __typename
                }
                __typename
            }
            __typename
            }
            special_from_date
            special_to_date
            new_from_date
            new_to_date
        }
        }
    }
`;

export default { getAllProduct };
