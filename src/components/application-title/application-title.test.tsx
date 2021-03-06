import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import "../../translations/translations";
import Enzyme, { shallow } from "enzyme";
import React from "react";
import { Typography } from "@material-ui/core";
import ApplicationTitle from "./application-title";

Enzyme.configure({ adapter: new Adapter() });

describe("Test aplication title component", () => {
    const component: any = shallow(<ApplicationTitle />);

    it("contain header elements", () => {
        expect(component.containsMatchingElement(<Typography />)).toBeTruthy;
    });

});
