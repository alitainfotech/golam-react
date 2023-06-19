import { t } from "i18next";
import * as Yup from "yup";

const UsernameSchema = (fieldName = "userName") =>
  Yup.object().shape({
    [fieldName]: Yup.string()
      .required(t("REQUIRED"))
      .matches(/^[\w\d]*$/, {
        message: t("ALNUM"),
      })
      .trim(),
  });

const EmailSchema = (fieldName = "email") =>
  Yup.object().shape({
    [fieldName]: Yup.string()
      .required(t("REQUIRED"))
      .email(t("INVALID_EMAIL"))
      .trim(),
  });

const PasswordSchema = (fieldName = "password") =>
  Yup.object().shape({
    [fieldName]: Yup.string()
      .required(t("REQUIRED"))
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{5,}$/,
        t("RESET_PASSWORD.PASSWORD_CRITERIA_ERROR")
      ),
  });

const ConfirmPasswordSchema = (
  fieldName = "confirmPassword",
  refFieldName = "password"
) =>
  PasswordSchema(refFieldName).shape({
    [fieldName]: Yup.string()
      .required(t("REQUIRED"))
      .oneOf(
        [Yup.ref(refFieldName), null],
        t("RESET_PASSWORD.PASSWORD_UNMATCH")
      ),
  });

const PhoneNumberSchema = (fieldName = "phoneNumber") =>
  Yup.object().shape({
    [fieldName]: Yup.string().test({
      name: "is-valid-phone",
      test(value, ctx) {
        const val_without_dashes = value?.replace(/-|_/g, "");

        if (!val_without_dashes) {
          return ctx.createError({ message: t("REQUIRED") });
        }
        if (val_without_dashes.length !== 10) {
          return ctx.createError({ message: t("INVALID_PHONE_NO") });
        }
        return true;
      },
    }),
  });

const AccountNumberSchema = (fieldName = "accountNumber") =>
  Yup.object().shape({
    [fieldName]: Yup.string().test({
      name: "is-valid-acc-no",
      test(value, ctx) {
        const val_without_dashes = value?.replace(/-|_/g, "");

        if (!val_without_dashes) {
          return ctx.createError({ message: t("REQUIRED") });
        }
        if (val_without_dashes.length !== 10) {
          return ctx.createError({ message: t("EMPLOYEE.ACC_NO_ERR") });
        }
        return true;
      },
    }),
  });

const AmountSchema = (fieldName = "amount", isRequired = true, min = 0) =>
  Yup.object().shape({
    [fieldName]: Yup.string()
      .nullable()
      .test({
        name: "is-valid-amount",
        test(value, ctx) {
          if ((isRequired && typeof value === "undefined") || value === "") {
            return ctx.createError({ message: t("REQUIRED") });
          }
          if (value < min) {
            return ctx.createError({ message: t("EMPLOYEE.AMOUNT_ERR") });
          }
          return true;
        },
      }),
  });

export {
  UsernameSchema,
  EmailSchema,
  PasswordSchema,
  ConfirmPasswordSchema,
  PhoneNumberSchema,
  AccountNumberSchema,
  AmountSchema,
};
