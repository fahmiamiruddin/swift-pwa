/* eslint-disable no-underscore-dangle */
import React from 'react';
import { modules } from '@config';
import CustomizableCheckboxOption from './components/CustomizableCheckboxOption';
import CustomizableRadioOption from './components/CustomizableRadioOption';

const CustomizableOption = ({
    options = [], ...other
}) => (
    <>
        {
            options && options.length > 0
                    && options.map((item, key) => {
                        if (item.__typename === 'CustomizableCheckboxOption'
                        && modules.product.customizableOptions.availableOptions.CustomizableCheckboxOption) {
                            return <CustomizableCheckboxOption key={key} {...item} {...other} />;
                        }

                        if (item.__typename === 'CustomizableRadioOption'
                        && modules.product.customizableOptions.availableOptions.CustomizableRadioOption) {
                            return <CustomizableRadioOption key={key} {...item} {...other} />;
                        }
                        return null;
                    })
        }
    </>
);

export default CustomizableOption;
