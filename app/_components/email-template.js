import * as React from "react";
import {
  Body,
  Button,
  Container,
  Column,
  Head,
  Heading,
  Html,
  Img,
  Preview,
  Row,
  Section,
  Text,
} from "@react-email/components";

export const EmailTemplate = ({ response }) => (
  <div>
    <Html>
      <Head />
      <Preview>File Shared With You</Preview>
      <Body style={main}>
        <Container>
          <Section style={content}>
            <Row style={{ paddingBottom: "0" }}>
              <Column>
                <Heading
                  style={{
                    fontSize: 32,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}>
                  Hi {response?.emailToSend?.split("@")[0]},
                </Heading>
                <Heading
                  as="h2"
                  style={{
                    fontSize: 26,
                    fontWeight: "bold",
                    textAlign: "center",
                  }}>
                  {response?.userName} Share file with you
                </Heading>

                <Text style={paragraph}>
                  <b>File Name: {response.fileName}</b>
                </Text>
                <Text style={{ marginTop: -5 }}>
                  <b>
                    File Size: {(response.fileSize / 1024 / 1024).toFixed(2)}
                  </b>
                </Text>
                <Text style={{ marginTop: -5 }}>
                  <b>File Type: {response.fileType}</b>
                </Text>
                <Text
                  style={{
                    color: "rgb(0,0,0, 0.5)",
                    fontSize: 14,
                    marginTop: -5,
                  }}>
                  *Access and Download file on your own risk
                </Text>

                <Text style={paragraph}>
                  Now You can also share files securely
                </Text>
                <Text style={{ marginTop: -5 }}>
                  Click the Button below to Access your file
                </Text>
              </Column>
            </Row>

            <a href={response?.shortUrl}>Click To Download</a>
            <Row style={{ paddingTop: "0" }}>
              <Column style={containerButton} colSpan={2}>
                <Button style={button} href={response?.shortUrl}>
                  Click here to Download
                </Button>
              </Column>
            </Row>
          </Section>

          <Text
            style={{
              textAlign: "center",
              fontSize: 12,
              color: "rgb(0,0,0, 0.7)",
            }}>
            © 2025 | Rajat Gupta @2024 Copyrights U.S.A. | https://rajatg.com
          </Text>
        </Container>
      </Body>
    </Html>
  </div>
);

const main = {
  backgroundColor: "#fff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const paragraph = {
  fontSize: 16,
};

const logo = {
  padding: "30px 20px",
};

const containerButton = {
  display: "flex",
  justifyContent: "center",
  width: "100%",
};

const button = {
  backgroundColor: "#e00707",
  padding: "12px 30px",
  borderRadius: 3,
  color: "#FFF",
  fontWeight: "bold",
  border: "1px solid rgb(0,0,0, 0.1)",
  cursor: "pointer",
};

const content = {
  border: "1px solid rgb(0,0,0, 0.1)",
  borderRadius: "3px",
  overflow: "hidden",
};

const boxInfos = {
  padding: "20px 40px",
};

const containerImageFooter = {
  padding: "45px 0 0 0",
};
