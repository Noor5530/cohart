import React, {useState} from "react";

import MakeConnection from "./components/MakeConnection"
import AddInformation from "./components/AddInformationForm"
import Interesting from "./components/Interesting";
import SignUpSuccess from "./components/SignUpSuccess";

enum ADD_INFORMATION_STEP  {
    CONNECTION,
    INFORMATION,
    INTERESTING,
    LAST_STEP
}

const FirstLogin: React.FC = () => {
    const [step, setStep] = useState<ADD_INFORMATION_STEP>(ADD_INFORMATION_STEP.CONNECTION)

    const handleShowAddInfoForm = () => {
        setStep(ADD_INFORMATION_STEP.INFORMATION)
    }

    const handleShowInteresting = () => {
        setStep(ADD_INFORMATION_STEP.INTERESTING)
    }

    const handleShowLastStep = () => {
        setStep(ADD_INFORMATION_STEP.LAST_STEP)
    }
    
    if(step === ADD_INFORMATION_STEP.CONNECTION) {
        return <MakeConnection onPressButton={handleShowAddInfoForm}/>
    }
    if(step === ADD_INFORMATION_STEP.INFORMATION)  {
        return <AddInformation onNextStep={handleShowInteresting}/>
    }
    if(step === ADD_INFORMATION_STEP.INTERESTING) {
        return <Interesting onPressButton={handleShowLastStep}/>
    }
    return (
        <SignUpSuccess/>
    );
};

export default FirstLogin;
