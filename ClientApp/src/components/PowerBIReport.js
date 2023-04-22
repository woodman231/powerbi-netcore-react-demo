import React, { useEffect, useState } from 'react'
import { PowerBIEmbed, EmbedType } from 'powerbi-client-react';
import { models } from 'powerbi-client';

function PowerBIReport() {

    const [isLoadingEmbedConfig, setIsLoadingEmbedConfig] = useState(true);
    const [embedConfig, setEmbedConfig] = useState(null);
    const [loadingError, setLoadingError] = useState(null);

    useEffect(() => {
        const getEmbedConfig = async () => {
            try {
                const response = await fetch('embedinfo');
                const configReceived = await response.json();

                const configToUse = {
                    type: EmbedType.Report,
                    id: configReceived.EmbedReport[0].ReportId,
                    embedUrl: configReceived.EmbedReport[0].EmbedUrl,
                    accessToken: configReceived.EmbedToken.Token,
                    tokenType: models.TokenType.Embed,
                    settings: {
                        panes: {
                            filters: {
                                expanded: false,
                                visible: false
                            }
                        },
                        background: models.BackgroundType.Transparent
                    }
                }

                setEmbedConfig(configToUse);
                setIsLoadingEmbedConfig(false);
            }
            catch (error) {
                setLoadingError(error.message);
                setIsLoadingEmbedConfig(false);
            }
        }

        getEmbedConfig();        
    }, []);

    return (
        <>
            <h1>Power BI Report</h1>
            <p>This component demonstrates embedding a Power BI report.</p>
            {
                isLoadingEmbedConfig && <p>Loading...</p>
            }
            {
                !isLoadingEmbedConfig && loadingError && <p>{loadingError}</p>
            }
            {
                !isLoadingEmbedConfig && !loadingError && embedConfig &&
                <PowerBIEmbed
                    embedConfig={embedConfig}
                    cssClassName='apiembeddedreport'
                />
            }
        </>
    )
}

export default PowerBIReport