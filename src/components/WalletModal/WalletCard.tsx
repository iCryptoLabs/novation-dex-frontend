import React from 'react';
import { connectorLocalStorageKey, walletLocalStorageKey } from './config';
import { Login, Config } from './types';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import CardActionArea from '@mui/material/CardActionArea';

interface Props {
    walletConfig: Config;
    login: Login;
    onDismiss: () => void;
}

const WalletCard: React.FC<Props> = ({ login, walletConfig, onDismiss }) => {
    const { title, icon: Icon } = walletConfig;

    return (
        <Grid item xs={6}>
            <Card
                variant="outlined"
                sx={{
                    backgroundColor: '#000000',
                    fontSize: 16,
                    padding: '8px 12px',
                    borderRadius: 1,
                    border: '1px solid #00ACFD',
                    boxShadow: 'none',
                    backdropFilter: 'none',
                    height: '100%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
                onClick={() => {
                    if (!window.ethereum && walletConfig.href) {
                        window.open(walletConfig.href, '_blank', 'noopener noreferrer');
                    } else {
                        login(walletConfig.connectorId);
                        localStorage?.setItem(walletLocalStorageKey, walletConfig.title);
                        localStorage?.setItem(connectorLocalStorageKey, walletConfig.connectorId);
                        onDismiss();
                    }
                }}
                id={`wallet-connect-${title.toLocaleLowerCase()}`}
            >
                <CardActionArea>
                    <Stack
                        alignItems="center"
                        justifyContent="center"
                        sx={{
                            py: 2.5
                        }}
                    >
                        <Icon
                            sx={{
                                width: 32,
                                height: 'auto',
                                mb: 1
                            }}
                        />
                        <Typography textAlign="center">{title}</Typography>
                    </Stack>
                </CardActionArea>
            </Card>
        </Grid>
    );
};

export default WalletCard;
