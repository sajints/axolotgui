import { Login } from "@mui/icons-material";
import LoginButton from "./components/login-button";
import { Box, IconButton, useTheme } from "@mui/material";

const LoginPage = () => {
   
  
    return (
        <Box display="flex">
            <Box display="flex">
                <LoginButton></LoginButton>
            </Box>
            <Box display="flex">
                Das Axolotl Prinzip
                “Bioelektrische Felder sind die grundlegenden Signale für Entzündung und Regeneration. Wie beim Axolotl nutzen wir sie, um die Entzündung zu hemmen und die Zellen dorthin zu lenken, wo sie zur Heilung benötigt werden.“

                Prof. Dr. med. Albrecht Molsberger

                Video abspielen
                Bioelektrische Felder steuern die Wundheilung. Zellen wandern in bioelektrischen Feldern. So zum Beispiel Fibroblasten, Epithelzellen, Mesenchymale Stammzellen, Nervenzellen und immunkompetente Zellen.


                Wussten Sie, dass beim Axolotl verletzte Gliedmaßen und Organe vollständig nachwachsen - auch Herz und Hirn? Bei der Regeneration erzeugt sein Gewebe kleine bioelektrische Felder. Dieses Phänomen ist eine Grundlage der Axomera Therapie.
            </Box></Box>

    );};
    export default LoginPage;