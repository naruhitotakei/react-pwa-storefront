import { Formik } from "formik";
import React from "react";

import { AddNewTile, ErrorMessage, TileGrid } from "@components/atoms";
import { AddressTileOption } from "@components/molecules";

import * as S from "./styles";
import { IProps } from "./types";

/**
 * Example component description.
 */
const AddressGridSelector: React.FC<IProps> = ({
  addresses,
  selectedAddressId,
  errors,
  onSelect,
  formId,
  formRef,
}: IProps) => {
  const addNewTile = (
    <AddNewTile
      data-cy="addressTileAddNew"
      key="0"
      type="address"
      onClick={() => null}
    />
  );

  return (
    <Formik
      initialValues={{
        addressTileOption: selectedAddressId,
      }}
      enableReinitialize={true}
      onSubmit={(values, { setSubmitting }) => {
        if (onSelect && values.addressTileOption) {
          const address = addresses.find(
            addr => addr.id === values.addressTileOption
          );
          if (address) {
            onSelect(address.address, values.addressTileOption);
          }
        }
        setSubmitting(false);
      }}
    >
      {({
        handleChange,
        handleSubmit,
        handleBlur,
        values,
        setFieldValue,
        setFieldTouched,
      }) => {
        return (
          <S.AddressGridForm id={formId} ref={formRef} onSubmit={handleSubmit}>
            <TileGrid
              columns={2}
              elements={addresses.reduce(
                (elements, { id, address }, index) => {
                  elements.push(
                    <AddressTileOption
                      data-cy={`addressTileOption${index}`}
                      key={id}
                      id={id}
                      inputName="addressTileOption"
                      label="Deliver to this address"
                      address={address}
                      onChange={() => setFieldValue("addressTileOption", id)}
                      checked={
                        !!values.addressTileOption &&
                        values.addressTileOption === id
                      }
                    />
                  );
                  return elements;
                },
                [addNewTile]
              )}
            />
            <ErrorMessage errors={errors} />
          </S.AddressGridForm>
        );
      }}
    </Formik>
  );
};

export { AddressGridSelector };
