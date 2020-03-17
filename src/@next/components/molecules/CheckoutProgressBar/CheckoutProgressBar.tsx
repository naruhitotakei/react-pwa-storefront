import React from "react";
import { Link } from "react-router-dom";

import * as S from "./styles";
import { IProps, IStep } from "./types";

const activeDot = (
  <S.ActiveDot>
    <S.Dot done={true} />
  </S.ActiveDot>
);

const doneDot = <S.Dot done={true} />;

const inactiveDot = <S.Dot />;

const generateDot = (stepIndex: number, currentActiveStep: number) => {
  if (stepIndex < currentActiveStep) {
    return doneDot;
  }
  if (stepIndex === currentActiveStep) {
    return activeDot;
  }
  if (stepIndex > currentActiveStep) {
    return inactiveDot;
  }
};

const generateLabel = (
  stepIndex: number,
  name: string,
  numberOfSteps: number
) => {
  if (stepIndex === 0) {
    return <S.LeftLabel>{name}</S.LeftLabel>;
  }
  if (stepIndex === numberOfSteps - 1) {
    return <S.RightLabel>{name}</S.RightLabel>;
  }
  return <S.Label>{name}</S.Label>;
};

const generateProgressBar = (
  index: number,
  currentActive: number,
  numberOfSteps: number
) => {
  if (currentActive > index) {
    return <S.ProgressBar done={true} />;
  }
  if (index === numberOfSteps - 1) {
    return;
  }
  if (index >= currentActive) {
    return <S.ProgressBar />;
  }
};

const generateSteps = (steps: IStep[], currentActive: number) => {
  return steps?.map((step, index) => {
    return (
      <>
        <Link to={step.link}>
          {generateDot(index, currentActive)}
          {generateLabel(index, step.name, steps.length)}
        </Link>
        {generateProgressBar(index, currentActive, steps.length)}
      </>
    );
  });
};

/**
 * Example component description.
 */
const CheckoutProgressBar: React.FC<IProps> = ({
  steps,
  activeStep,
}: IProps) => {
  return (
    <>
      <S.Wrapper>{generateSteps(steps, activeStep)}</S.Wrapper>
    </>
  );
};

export { CheckoutProgressBar };
