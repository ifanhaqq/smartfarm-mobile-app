import * as SecureStore from 'expo-secure-store';

let token = null;

export class TokenService {
    private token: string | null = null;

    async setToken(newToken: string | null) {
        this.token = newToken;

        if (this.token !== null) {
            await SecureStore.setItemAsync("token", this.token);
        } else {
            await SecureStore.deleteItemAsync("token");
        }
    }

    async getToken() {
        if (this.token !== null) {
            return this.token;
        }

        this.token = await SecureStore.getItemAsync("token");

        return this.token;
    }

}