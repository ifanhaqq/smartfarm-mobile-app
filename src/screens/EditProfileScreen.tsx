import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import UserContext from "src/contexts/AuthContext";
import { AuthService } from "src/services/AuthService";
import CloudHeader from "src/components/CloudHeader";
import { TokenService } from "src/services/TokenService";
import Loading from "src/components/Loading";

const EditProfileScreen: React.FC = () => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const authService: AuthService = new AuthService();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setName(user.name);
    setEmail(user.email);

    setLoaded(true);
  }, [loaded]);

  async function sendUpdatedData() {
    try {
      const response = await authService.updateUser(
        user.id,
        name,
        email,
        password
      );

      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }

  async function updateToken() {
    const tokenService: TokenService = new TokenService();
    const token = await tokenService.getToken();
    const user = await authService.loadUser(token);
    console.log(user);
    setUser(user);
  }

  const handleSave = async () => {
    sendUpdatedData().then(() => {
      updateToken();
      Alert.alert("Sukses", "Data akun berhasil diperbarui!");
    });
  };

  if (!loaded) return <Loading />;

  return (
    <ImageBackground
      source={require("../assets/background-screen.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <CloudHeader></CloudHeader>
      <ScrollView>
        <View
          style={{
            margin: "5%",
            borderRadius: 20,
            backgroundColor: "rgba(255, 255, 255, 0.5)",
          }}
        >
          <Text style={styles.inputText}>Nama lengkap</Text>
          <TextInput
            style={styles.inputButton}
            placeholder="Nama Lengkap"
            onChangeText={setName}
            value={name}
          />

          <Text style={styles.inputText}>Email</Text>
          <TextInput
            style={styles.inputButton}
            placeholder="Email"
            onChangeText={setEmail}
            value={email}
          />

          <Text style={styles.inputText}>Password</Text>
          <TextInput
            style={styles.inputButton}
            placeholder="Password"
            onChangeText={setPassword}
            value={password}
          />

          <Text style={styles.inputText}>Masukkan kembali password</Text>
          <TextInput
            style={styles.inputButton}
            placeholder="Repeat password"
            onChangeText={setPasswordRepeat}
            value={password}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              handleSave();
            }}
          >
            <Text style={styles.saveText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  inputButton: {
    backgroundColor: "white",
    borderRadius: 20,
    marginLeft: "5%",
    marginBottom: "5%",
    padding: "4%",
  },
  inputText: {
    // color: "#616161",
    fontWeight: "200",
    marginLeft: "6%",
    marginBottom: "3%",
  },
  saveButton: {
    backgroundColor: "#3872E3",
    borderRadius: 20,
    margin: "5%",
    marginTop: "90%",
    padding: "4%",
  },
  saveText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
