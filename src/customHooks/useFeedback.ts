import { useState } from "react";
import { validateEmail } from "../helpers/helpers";
import { FeedbackEnhanced, FeedbackInterface, PersonInterface } from "../types/types";

export const defaultFeedback = {
  nameMessage: "",
  emailMessage: "",
  phoneMessage: "",
  ready: false,
};

export const useFeedback = (): FeedbackEnhanced => {
  const [feedback, setFeedback] = useState<FeedbackInterface>(defaultFeedback);

  const validator = (value: PersonInterface) => {
    switch (true) {
      case value.name === "":
        setFeedback({
          nameMessage: "Name is required",
          ready: false,
        });
        break;
      case !validateEmail(value.email):
        setFeedback({
          emailMessage: "Email has an invalid format",
          ready: false,
        });
        break;
      case value.phone === "":
        setFeedback({
          phoneMessage: "Phone is required",
          ready: false,
        });
        break;
      default:
        setFeedback({
          nameMessage: "",
          emailMessage: "",
          phoneMessage: "",
          ready: true,
        });
        break;
    }
  };

  return { feedback, setFeedback, validator };
};
