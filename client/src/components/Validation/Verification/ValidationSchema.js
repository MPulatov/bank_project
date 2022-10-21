import * as yup from "yup";

export const SchemaVerifyStaticTerminal = yup.object().shape({
  terminal_id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(8, "Пожалуйста, введите не меньше 8 символов.")
    .matches(
      /^[a-zA-Z]{2}[0-9]{10}$/,
      "Пожалуйста, вводите только 2 букв и 6 цифры. "
    ),
  provider_id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(1, "Пожалуйста, введите не меньше 1 символов."),

  active: yup.string().required("Это поле необходимо заполнить").min(1),

  local_terminal_password: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
  local_terminal_id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
});

export const SchemaVerifyStaticProvider = yup.object().shape({
  name: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(5, "Пожалуйста, введите не меньше 5 символов.")
    .max(20),
  purpose_text: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(5, "Пожалуйста, введите не меньше 5 символов."),
});

export const SchemaVerifyKmRetailer = yup.object().shape({
  name: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов.")
    .max(30),

  addres: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
  km_retailerid: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
  ein: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .min(10, "Пожалуйста, введите не меньше 10 символов."),
  inn: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .min(9, "Пожалуйста, введите не меньше 9 символов."),
  number: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(6, "Пожалуйста, введите не меньше 6 символов."),
  rnm: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .min(10, "Пожалуйста, введите не меньше 10 символов."),
  active: yup.string().required("Это поле необходимо заполнить.").max(1),
  description: yup
    .string()
    .required("Это поле не важно заполнить.")
    .min(10, "Пожалуйста, введите не меньше 10 символов."),
});

export const SchemaVerifyKmTerminal = yup.object().shape({
  location: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(6, "Пожалуйста, введите не меньше 6 символов."),
  terminal_name: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(
      /^[A-Z]{4}[0-9]+$/,
      "Пожалуйста, вводите только в верхнем регистре PCBT."
    )
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
  active_code: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .min(2, "Пожалуйста, введите не меньше 2 символов."),
  terminal_status: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .max(1),
  device_code: yup.string().required("Это поле необходимо заполнить.").min(1),
  devicesn: yup.string().required("Это поле необходимо заполнить.").min(1),
  device_model: yup.string().required("Это поле необходимо заполнить.").min(2),
  imei: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .min(15, "Пожалуйста, введите не меньше 15 символов."),
  mcc: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .min(1),
  pos_params_loaded: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .max(1),
  ip_address: yup.string().matches(/(^(\d{1,3}\.){3}(\d{1,3})$)/, {
    message: "Неправильный IP адрес",
    excludeEmptyString: true,
  }),
  host: yup.string().matches(/(^[0-9]+$)/, {
    message: "Пожалуйста, вводите только цифры.",
    excludeEmptyString: true,
  }),
  terminal_type_id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(1),
  owner_name: yup.string().required("Это поле необходимо заполнить.").min(6),
});

export const SchemaVerifyKmTerminalPremission = yup.object().shape({
  terminal_id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(1, "Пожалуйста, введите не меньше 1 символов."),
  transaction_code: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(1, "Пожалуйста, введите не меньше 1 символов."),
});

export const SchemaVerifyTijoratOrganization = yup.object().shape({
  organization_name: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(5, "Пожалуйста, введите не меньше 5 символов.")
    .max(20, "Пожалуйста, введите не болше 20 символов."),
});

export const SchemaVerifyTijoratSale = yup.object().shape({
  name: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов.")
    .max(50, "Пожалуйста, введите не болше 50 символов."),
  organization_id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(1, "Пожалуйста, введите не меньше 1 символов."),
});

export const SchemaVerifyTijoratUser = yup.object().shape({
  fullname: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов.")
    .max(30, "Пожалуйста, введите не болше 30 символов."),

  email: yup
    .string()
    .email()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
  password: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(4, "Пожалуйста, введите не меньше 4 символов."),
  organization_id: yup
    .string()
    .required("Выбирайте организацию")
    .min(1, "Пожалуйста, введите не меньше 1 символов."),
  active: yup
    .string()
    .required("Выбирайте Статус")
    .min(1, "Пожалуйста, введите не меньше 1 символов."),
});

export const SchemaVerifyPosRequests = yup.object().shape({
  term_inn: yup
    .string()
    .min(9, "Пожалуйста, введите не меньше 9 символов.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .required("Это поле необходимо заполнить."),
  term_ein: yup
    .string()
    .min(10, "Пожалуйста, введите не меньше 10 символов.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .required("Это поле необходимо заполнить."),
  term_rnm: yup
    .string()
    .min(10, "Пожалуйста, введите не меньше 10 символов.")
    .matches(/^[0-9]+$/, "Пожалуйста, вводите только цифры.")
    .required("Это поле необходимо заполнить."),
  term_sn: yup
    .string()
    .min(10, "Пожалуйста, введите не меньше 10 символов.")
    .required("Это поле необходимо заполнить."),
});

export const SchemaVerifyCkmsTransferKey = yup.object().shape({
  id: yup
    .string()
    .required("Это поле необходимо заполнить.")
    .min(1, "Пожалуйста, введите не меньше 4 символов.")
    .max(50, "Пожалуйста, введите не болше 50 символов."),
});
