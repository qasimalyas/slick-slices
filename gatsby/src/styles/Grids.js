import styled from "styled-components";

export const HomePageGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(2, minmax(auto, 1fr));
`;

export const ItemsGrid = styled.div`
  display: grid;
  gap: 2rem;
  grid-template-columns: 1fr 1fr;
`;

// single grid item for hgome page
export const ItemStyles = styled.div`
  position: relative;
  text-align: center;
  @keyframes shine {
    from {
      background-position: 200%;
    }
    to {
      background-position: -40px;
    }
  }
  img {
    height: auto;
    vertical-align: middle;
    &.loading {
      --shine: white;
      --background: var(--grey);
      background-image: linear-gradient(
        90deg,
        var(--background) 0px,
        var(--shine) 40px,
        var(--background) 80px
      );
      animation: shine 1s infinite linear;
    }
  }
  p {
    transform: rotate(-2deg) translateY(-140%);
    position: absolute;
    left: 0;
    width: 100%;
  }
  .mark {
    display: inline;
  }
`;
