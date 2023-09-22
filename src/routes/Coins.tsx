import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query"; //react 버전 18에 맞춰서 tanstack이걸로 사용
import { fetchCoins } from "./api";
import { isDarkAtom } from "../atoms";
import { useSetRecoilState } from "recoil";

const Container = styled.div`
  position: relative;
  padding: 0px 20px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 80px 0;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 20px;
`;

const CoinsListContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.cardBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 50px;
  padding: 20px;
  cursor: pointer;
  transition: background-color 0.5s ease-in-out;
  a {
    transition: color 0.5s ease-in-out;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  &:hover {
    background-color: white;
    a {
      color: black;
    }
  }
`;

const ImgContainer = styled.span`
  display: inline-block;
  width: 200px;
  height: 200px;
  overflow: hidden;
  border-radius: 50%;
  margin-bottom: 30px;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Loader = styled.p`
  text-align: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ToggleBtn = styled.button`
  position: fixed;
  left: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
  background-color: white;
  border: none;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  imageUrl: string;
}

function Coins() {
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDartAtom = () => setDarkAtom((prev) => !prev);
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);

  return (
    <Container>
      <Header>
        <Title>Disney Characters</Title>
        <ToggleBtn onClick={toggleDartAtom}>Toggle</ToggleBtn>
      </Header>

      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsListContainer>
          <CoinsList>
            {data?.slice(0, 30).map((coin) => (
              <Coin key={coin.id}>
                <Link to={`/${coin.id}`} state={coin}>
                  <ImgContainer>
                    <img
                      src={coin.imageUrl} // coin 객체의 imageUrl 속성을 사용하여 이미지를 동적으로 로드합니다.
                      alt={coin.name}
                    />
                  </ImgContainer>
                  {coin.name}
                </Link>
              </Coin>
            ))}
          </CoinsList>
        </CoinsListContainer>
      )}
    </Container>
  );
}

export default Coins;
