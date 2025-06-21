import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import OtpVerify from "../components/OtpVerify";
import { showError } from "../utils/toast";
import axios from "axios";
import { IoArrowBack } from "react-icons/io5";

function SignIn() {
  const navigate = useNavigate();

  const [step, setStep] = useState("phone");
  const [phoneNo, setPhoneNo] = useState("");

  const isValidPhoneNumber = (phone) => {
    const regex = /^((\+91?)|\+)?[7-9][0-9]{9}$/; // Indian phone format
    return regex.test(phone);
  };

  const sendOtp = async (e) => {
    e.preventDefault();
    if (isValidPhoneNumber(phoneNo)) {
      try {
        await axios.post("http://localhost:5000/api/auth/send-otp", {
          phoneNo,
        });
        setStep("otp");
      } catch (err) {
        showError("Failed to send OTP");
      }
    } else {
      showError("Invalid phoneno.");
    }
  };

  const handleBackButton = () => {
    setStep("phone");
  };

  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      navigate("/");
    }
  }, []);

  return (
    <>
      <FormContainer>
        <form>
          <div className="brand">
            <h1>Chat</h1>
          </div>

          {step === "phone" && (
            <div>
              <input
                type="text"
                placeholder="Enter phone number"
                name="phoneno"
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <button type="submit" onClick={(e) => sendOtp(e)}>
                Send OTP
              </button>
            </div>
          )}

          {step === "otp" && (
            <>
              <IoArrowBack onClick={handleBackButton} size="22" color="black" />
              <OtpVerify phoneNo={phoneNo} />
            </>
          )}
        </form>
      </FormContainer>
    </>
  );
}

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background: linear-gradient(
    to bottom,
    #128c7e 0%,
    #128c7e 20%,
    #dcdcdc 20%,
    #dcdcdc 100%
  );
  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
    img {
      height: 5rem;
    }
    h1 {
      color: grey;
      text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #ece5dd;
    padding: 3rem 5rem;
  }
  input {
    background-color: white;
    padding: 1rem;
    border: 0.1rem solid white;
    border-radius: 0.4rem;
    color: grey;
    font-size: 1rem;
    &:focus {
      border: 0.1rem solid #25d366;
      outline: none;
    }
  }
  button {
    background-color: #128c7e;
    color: white;
    padding: 1rem 2rem;
    border: none;
    font-weight: bold;
    cursor: pointer;
    border-radius: 0.4rem;
    font-size: 1rem;
    text-transform: uppercase;
    &:hover {
      background-color: #075e54;
    }
  }
  span {
    color: grey;
    text-transform: uppercase;
    a {
      color: #128c7e;
      text-decoration: none;
      font-weight: bold;
    }
  }
`;
export default SignIn;
