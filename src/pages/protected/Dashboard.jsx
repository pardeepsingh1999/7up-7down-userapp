import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { useDispatch, useSelector } from "react-redux";
import { errorHandler, showToast } from "../../helpers";
import { getAndUpdateUserData } from "../../redux/actions";
import { rolldice } from "../../http/http-calls";
import { Box, Stack } from "@mui/system";
import {
  Alert,
  Chip,
  ImageList,
  ImageListItem,
  LinearProgress,
} from "@mui/material";
import dice1 from "../../assets/img/dice1.png";
import dice2 from "../../assets/img/dice2.png";
import dice3 from "../../assets/img/dice3.png";
import dice4 from "../../assets/img/dice4.png";
import dice5 from "../../assets/img/dice5.png";
import dice6 from "../../assets/img/dice6.png";
import diceLoading from "../../assets/img/dice-loading.gif";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

const Dashboard = () => {
  const dispatch = useDispatch();

  const userCredential = useSelector((state) => state?.userCredential);

  const [firstDiceNumber, setFirstDiceNumber] = useState(
    Math.floor(Math.random() * 6) + 1
  );
  const [secondDiceNumber, setSecondDiceNumber] = useState(
    Math.floor(Math.random() * 6) + 1
  );

  const [betAmount, setBetAmount] = useState(100);
  const [betNumber, setBetNumber] = useState(7);

  const [loadingState, setLoadingState] = useState({
    data: false,
    rolldice: false,
  });

  const diceImages = [dice1, dice2, dice3, dice4, dice5, dice6];

  const _manageLoadingState = (key = "", value = false) => {
    setLoadingState((prev) => ({ ...prev, [key]: value }));
  };

  const _getAndUpdateUserData = async () => {
    try {
      _manageLoadingState("data", true);

      await getAndUpdateUserData()(dispatch);

      _manageLoadingState("data", false);
    } catch (error) {
      _manageLoadingState("data", false);
      errorHandler(error);
    }
  };

  const _rolldice = async () => {
    try {
      _manageLoadingState("rolldice", true);

      const payload = {
        betAmount,
        betNumber,
      };

      const res = await rolldice(payload);

      if (res.isWon) {
        if (res.isJackpot) {
          showToast("Congratulations! You hit the jackpot!", "success");
        } else {
          showToast("Congratulations! You won!", "success");
        }
      } else {
        showToast("Oh no, you lost. Please try your luck again!", "info");
      }

      setFirstDiceNumber(res.dice1);
      setSecondDiceNumber(res.dice2);

      _getAndUpdateUserData();

      _manageLoadingState("rolldice", false);
    } catch (error) {
      _manageLoadingState("rolldice", false);
      errorHandler(error);
    }
  };

  useEffect(() => {
    _getAndUpdateUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <Card>
        <ImageList cols={2}>
          {loadingState?.rolldice ? (
            <>
              <ImageListItem>
                <img
                  style={{ objectFit: "none" }}
                  srcSet={diceLoading}
                  src={diceLoading}
                  alt="dice"
                  loading="lazy"
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  style={{ objectFit: "none" }}
                  srcSet={diceLoading}
                  src={diceLoading}
                  alt="dice"
                  loading="lazy"
                />
              </ImageListItem>
            </>
          ) : (
            <>
              <ImageListItem>
                <img
                  srcSet={diceImages[firstDiceNumber - 1]}
                  src={diceImages[firstDiceNumber - 1]}
                  alt={`dice${firstDiceNumber}`}
                  loading="lazy"
                />
              </ImageListItem>
              <ImageListItem>
                <img
                  srcSet={diceImages[secondDiceNumber - 1]}
                  src={diceImages[secondDiceNumber - 1]}
                  alt={`dice${secondDiceNumber}`}
                  loading="lazy"
                />
              </ImageListItem>
            </>
          )}
        </ImageList>

        <CardContent>
          <Box variant="contained" sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                color="primary"
                label={`Played: ${userCredential?.user?.played || 0}`}
              />
              <Chip
                color="success"
                label={`Won: ${userCredential?.user?.won || 0}`}
              />
              <Chip
                color="success"
                label={`Jackpot: ${userCredential?.user?.jackpot || 0}`}
              />
            </Stack>
          </Box>

          <Box variant="contained" sx={{ mt: 2, mb: 2 }}>
            <Stack direction="row" spacing={1}>
              <Chip
                color="primary"
                label={`Points: ${userCredential?.user?.points || 0}`}
              />
              <Chip
                color="error"
                label={`Lost: ${
                  (userCredential?.user?.played || 0) -
                  (userCredential?.user?.won || 0)
                }`}
              />
            </Stack>
          </Box>

          <Box variant="contained" sx={{ mt: 2, mb: 2 }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Bet Amount
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={betAmount}
                onChange={(e) => setBetAmount(+e.target.value)}
              >
                <FormControlLabel value={100} control={<Radio />} label="100" />
                <FormControlLabel value={200} control={<Radio />} label="200" />
                <FormControlLabel value={500} control={<Radio />} label="500" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box variant="contained" sx={{ mt: 2, mb: 2 }}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Bet Number
              </FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                value={betNumber}
                onChange={(e) => setBetNumber(+e.target.value)}
              >
                <FormControlLabel
                  value={1}
                  control={<Radio />}
                  label="7 Down"
                />
                <FormControlLabel
                  value={7}
                  control={<Radio />}
                  label="Lucky 7"
                />
                <FormControlLabel value={12} control={<Radio />} label="7 Up" />
              </RadioGroup>
            </FormControl>
          </Box>

          <Box variant="contained" sx={{ mt: 2, mb: 2 }}>
            <Alert
              icon={<EmojiEventsIcon fontSize="inherit" />}
              severity="success"
            >
              If you win, you will receive {betNumber === 7 ? "5x" : "2x"} your
              amount! Good luck!
            </Alert>
          </Box>
        </CardContent>

        {loadingState?.rolldice ? (
          <Box variant="contained" sx={{ mb: 2 }}>
            <LinearProgress />
          </Box>
        ) : (
          <>
            <Box variant="contained" textAlign={"center"} sx={{ mb: 2 }}>
              <Button variant="outlined" onClick={() => _rolldice()}>
                Roll Dice
              </Button>
            </Box>
          </>
        )}
      </Card>
    </>
  );
};

export default Dashboard;
