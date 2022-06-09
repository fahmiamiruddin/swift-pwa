import React from 'react';
import Layout from '@layout';
import { getAllProducts } from '@core_modules/produkku/services/graphql';
import ButtonIcon from '@common_buttonicon';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    media: {
        height: 140,
    },
    button: {
        borderRadius: '0px !important',
    },
});

const CoreDefault = (props) => {
    const { data, loading } = getAllProducts();
    const config = {
        title: 'halaman produkku',
        header: 'relative',
        headerTitle: 'halaman produkku',
        bottomNav: false,
    };

    if (loading) return (<>Loading ...</>);
    const classes = useStyles();

    // console.log(data);

    const { items } = data.products;
    // console.log('items', items);
    return (
        <Layout pageConfig={config} {...props}>
            <Typography gutterBottom variant="h5" component="h2">
                Custom Page
            </Typography>
            <Typography gutterBottom variant="h5" component="h2">
                Daftar Produk ku ada
                {' '}
                {data.products.total_count}
            </Typography>
            {
                items && items.length > 0 ? (
                    <Grid container spacing={3}>
                        {
                            items.map((product) => (
                                <Grid item xs={4} key={product.id}>
                                    <Card className={classes.root}>
                                        <CardActionArea>
                                            <CardMedia
                                                className={classes.media}
                                                image={product.small_image.url}
                                                title={product.name}
                                            />
                                            <CardContent>
                                                <Typography gutterBottom variant="h5" component="h3">
                                                    {product.name}
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" component="p">
                                                    {
                                                        product.short_description.html && (
                                                            <p>{ product.short_description.html }</p>
                                                        )
                                                    }

                                                </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <Button color="primary" className={classes.button}>
                                                {product.price_range.minimum_price.regular_price.currency}
                                                {' '}
                                                {product.price_range.minimum_price.regular_price.value}
                                            </Button>
                                            <ButtonIcon text="Add to cart" />
                                        </CardActions>
                                    </Card>
                                </Grid>
                            ))
                        }
                    </Grid>
                ) : (
                    <p>Loading . . .</p>
                )
            }
        </Layout>
    );
};

export default CoreDefault;
