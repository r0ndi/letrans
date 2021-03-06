import Adapter from "@wojtekmaj/enzyme-adapter-react-17"
import Typography from '@material-ui/core/Typography';
import "../../translations/translations";
import Enzyme, { shallow } from "enzyme";
import React from "react";
import SuspenseFallback from "./suspense-fallback";

Enzyme.configure({ adapter: new Adapter() });

describe("Test suspense component", () => {
    const component: any = shallow(<SuspenseFallback />);

    it("contain typography", () => {
        expect(component.containsMatchingElement(<Typography />)).toBeTruthy;
    });

});
