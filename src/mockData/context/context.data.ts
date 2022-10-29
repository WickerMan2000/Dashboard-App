import { PersonInterface, UpdatedDetails } from "../../types/types";
import { mockedUserData, updatedMockedUserData } from "../user/user.data";

export const mockedInputContextConfigurationData = {
    person: mockedUserData,
    updatedPerson: updatedMockedUserData,
    setPerson: (args: PersonInterface) => {},
    setUpdatedPerson: (args: UpdatedDetails) => {},
};