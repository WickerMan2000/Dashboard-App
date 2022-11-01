import { PersonInterface, UpdatedDetails } from "../../types/types";
import { mockedUserData, mockedUpadtedUserData } from "../user/user.data";

export const mockedInputContextConfigurationData = {
    person: mockedUserData,
    updatedPerson: mockedUpadtedUserData,
    setPerson: (args: PersonInterface) => {},
    setUpdatedPerson: (args: UpdatedDetails) => {},
};

export const mockedEnablerContextConfigurationData = {
    formEnabled: true,
    setFormEnabled: (args: boolean) => {},
};