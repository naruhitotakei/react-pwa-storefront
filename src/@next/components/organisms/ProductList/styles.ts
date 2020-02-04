import { media, styled } from "@styles";

export const List = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 2rem;

  ${media.mediumScreen`
    grid-template-columns: 1fr 1fr;
    grid-gap: 1.5rem;
  `}

  ${media.smallScreen`
    grid-template-columns: 1fr;
    grid-gap: 1rem;
  `}
`;

export const Loader = styled.div`
  text-align: center;
  margin: 2.5rem 0;
`;

export const NotFount = styled.div``;
