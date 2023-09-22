import { useQuery } from "@tanstack/react-query";
import { useParams, useLocation, Outlet, Link } from "react-router-dom";
import { styled } from "styled-components";
import { fetchCoinInfo } from "./api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 520px;
  margin: 0 auto;
  text-align: center;
`;

const PrevBtn = styled.button`
  font-size: 25px;
  font-weight: bold;
  color: white;
  border: none;
  background-color: transparent;
  cursor: pointer;
`;

const CharacterContainer = styled.div`
  width: 100%;

  margin-top: 20px;
  margin-bottom: 350px;
  text-align: center;
  padding: 50px;
`;

const CharacterImg = styled.span`
  display: inline-block;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  overflow: hidden;
  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const CharaterTitle = styled.p`
  color: #fff;
  font-size: 25px;
  margin: 30px 0;
`;

const CharacterDetail = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 17px;
  justify-content: center;
`;

const Details = styled.li`
  color: #333;
  background-color: white;
  border-radius: 8px;
  font-size: 20px;
  padding: 10px;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 10px 20px;
  border-radius: 10px;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span:first-child {
    font-size: 10px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;

const Description = styled.p`
  margin: 20px 0;
`;

const Loader = styled.p`
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ $isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 7px 0;
  border-radius: 10px;
  a {
    display: block;
    color: ${(props) =>
      props.$isActive ? props.theme.accentColor : props.theme.textColor};
  }
`;

interface RouteParams {
  coinId: string;
}

interface LocationState {
  state: {
    name: string;
    imageUrl: string;
  };
}

interface InfoData {
  id: string;
  name: string;
  films: string[];
}

function Coin() {
  const { coinId } = useParams<keyof RouteParams>() as RouteParams;
  const { state } = useLocation() as LocationState;
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(`${coinId}`)
  );

  // console.log(infoData);

  const loading = infoLoading;

  return (
    <Container>
      <Header></Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Link to={`/`}>
            <PrevBtn>&#8592;</PrevBtn>
          </Link>

          <CharacterContainer>
            <CharacterImg>
              <img
                src={state.imageUrl} // coin 객체의 imageUrl 속성을 사용하여 이미지를 동적으로 로드합니다.
              />
            </CharacterImg>
            <CharaterTitle>{infoData?.name}</CharaterTitle>
            <CharacterDetail>
              {infoData?.films.map((item, index) => (
                <Details key={index}>{item}</Details>
              ))}
            </CharacterDetail>
          </CharacterContainer>
        </>
      )}
      <Outlet context={{ coinId }} />
    </Container>
  );
}

export default Coin;
