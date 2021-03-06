/* eslint-disable consistent-return */
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-bitwise */
/* eslint-disable no-shadow */
/**
 * thanks to `jamesmoriarty`
 * https://github.com/jamesmoriarty/react-instagram-authless-feed/blob/master/src/components/Feed.js
 */
class Instagram {
    /**
     * get feed by tags
     * @param {*} tagname
     * @returns
     */
    static getFeedTag(tagname) {
        const mapMedia = (json) => {
            try {
                const thumbnailIndex = (node) => {
                    node.thumbnail_resources.forEach((item, index) => {
                        if (item.config_width === 640) {
                            return index;
                        }
                    });

                    return 4; // MAGIC
                };

                const url = (node) => `https://www.instagram.com/p/${node.shortcode}`;

                const src = (node) => {
                    switch (node.__typename) {
                    case 'GraphVideo':
                        return node.thumbnail_src;
                    case 'GraphSidecar':
                    default:
                        return node.thumbnail_resources[thumbnailIndex(node)].src;
                    }
                };

                const alt = (node) => {
                    if (node.edge_media_to_caption.edges[0] && node.edge_media_to_caption.edges[0].node) {
                        return node.edge_media_to_caption.edges[0].node.text;
                    }
                    if (node.accessibility_caption) {
                        return node.accessibility_caption;
                    }
                    return '';
                };

                const { edges } = json.entry_data.TagPage[0].graphql.hashtag.edge_hashtag_to_media;

                return edges.map((edge) => ({
                    alt: alt(edge.node),
                    url: url(edge.node),
                    src: src(edge.node),
                }));
            } catch (err) {
                throw Error('cannot map media array');
            }
        };

        const getJSON = (body) => {
            try {
                const data = body.split('window._sharedData = ')[1].split('</script>')[0];
                return JSON.parse(data.substr(0, data.length - 1));
            } catch (err) {
                throw Error('cannot parse response body');
            }
        };

        const url = () => `https://images${~~(
            Math.random() * 3333
        )}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/explore/tags/${tagname}/`;

        const fetchWithRetry = (n, err) => {
            if (n <= 1) throw err;
            return fetch(url())
                .then((resp) => resp.text())
                .then((body) => getJSON(body))
                .then((json) => mapMedia(json))
                .catch((err) => fetchWithRetry(n - 1, err));
        };

        return fetchWithRetry(5);
    }

    /**
     * get feed by username
     * @param {*} username
     * @returns
     */
    static getFeed(username) {
        const mapMedia = (json) => {
            try {
                const thumbnailIndex = (node) => {
                    node.thumbnail_resources.forEach((item, index) => {
                        if (item.config_width === 640) {
                            return index;
                        }
                    });

                    return 4; // MAGIC
                };

                const url = (node) => `https://www.instagram.com/p/${node.shortcode}`;

                const src = (node) => {
                    switch (node.__typename) {
                    case 'GraphVideo':
                        return node.thumbnail_src;
                    case 'GraphSidecar':
                    default:
                        return node.thumbnail_resources[thumbnailIndex(node)].src;
                    }
                };

                const alt = (node) => {
                    if (node.edge_media_to_caption.edges[0] && node.edge_media_to_caption.edges[0].node) {
                        return node.edge_media_to_caption.edges[0].node.text;
                    }
                    if (node.accessibility_caption) {
                        return node.accessibility_caption;
                    }
                    return '';
                };

                const { edges } = json.entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media;

                return edges.map((edge) => ({
                    alt: alt(edge.node),
                    url: url(edge.node),
                    src: src(edge.node),
                }));
            } catch (err) {
                throw Error('cannot map media array');
            }
        };

        const getJSON = (body) => {
            try {
                const data = body.split('window._sharedData = ')[1].split('</script>')[0];
                return JSON.parse(data.substr(0, data.length - 1));
            } catch (err) {
                throw Error('cannot parse response body');
            }
        };

        const url = () => `https://images${~~(
            Math.random() * 3333
        )}-focus-opensocial.googleusercontent.com/gadgets/proxy?container=none&url=https://www.instagram.com/${username}/`;

        const fetchWithRetry = (n, err) => {
            if (n <= 1) throw err;
            return fetch(url())
                .then((resp) => resp.text())
                .then((body) => getJSON(body))
                .then((json) => mapMedia(json))
                .catch((err) => fetchWithRetry(n - 1, err));
        };

        return fetchWithRetry(5);
    }
}

export default Instagram;
