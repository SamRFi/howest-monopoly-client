**This project is a school assignment developed for educational purposes and is not intended for production use.**

# Requirements

| Bug behaviour  | How to reproduce  | Why it hasn't been fixed    |
|---|---|---|
|  You are able to collect rent as much as you want untill the next person has rolled the dices |  keep clicking collect rent when a player stands on your property and no one has rolled yet. |  We had not enough time to finish this task.|
|  the pawn gets duplicated |  If you spam click playername on the right playerInfo section |  We had  not enough time to fix this. |
|   you get console error |  If you can't collect rent anymore and you click collect rent again | We had not enough time to fix this.  |


|PRIORITY  |ENDPOINT                                                                                                  |Client                | Client           |Server                       | Server                       |
|--------|--------------------------------------------------------------------------------------------------------|----------------------|-----------------|-----------------------------|-----------------------------|
|        |                                                                                                        |Visualize  ( HTML/CSS)|Consume API  (JS)|Process request  (API-Bridge)|Implement Game Rules  (logic)|
|        |**General Game and API Info**                                                                               |100%                  |YES/NO           |YES/NO                       |100%                         |
|        |GET /                                                                                                   |           100%           |         YES        |            YES                 |           100%                  |
|MUSTHAVE|GET /tiles                                                                                              |    100%                  |          YES        |            YES                |          100%                   |
|MUSTHAVE|GET /tiles /{tileId}                                                                                    |          100%            |      YES           |                 YES            |          100%                   |
|        |GET /chance                                                                                             |        100%              |       YES          |             YES                |             100%                |
|        |GET /community-chest                                                                                    |       100%               |       YES          |             YES                |            100%                 |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Managing Games**                                                                                          |                      |                 |                             |                             |
|        |DELETE /games                                                                                           |         0%             |       NO          |             NO            |            0%                |
|MUSTHAVE|GET /games                                                                                              |        100%              |         YES        |              YES               |            100%                 |
|        |Additional requirement: with filters                                                                    |       80%               |     YES            |            YES                 |           100%                  |
|MUSTHAVE|POST /games                                                                                             |          100%             |     YES           |       YES         |          100%                   |
|MUSTHAVE|POST /games /{gameId} /players                                                                          |            100%          |        YES         |          YES                   |              100%              |
|        |                                                                                                        |                      |                 |                             |                             |
|        |Info                                                                                                    |          100%            |       YES          |              YES               |           100%                  |
|        |GET /games /dummy                                                                                       |         0%             |       NO          |             NO                |           0%                  |
|MUSTHAVE|GET /games /{gameId}                                                                                    |        100%              |       YES          |            YES                 |        100%                     |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Turn Management**                                                                                         |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /dice                                                      |          100%            |            YES     |             YES                |            100%                 |
|        |With jail                                                                                               |        100%              |       YES          |             YES                |           100%                  |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /bankruptcy                                                |       100%               |          YES       |              YES               |            50%                |
|        |Decent distribution of assets                                                                           |         0%             |      NO           |           NO                 |            0%                 |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Tax Management**                                                                                          |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /tax /estimate                                             |        0%              |         NO        |            NO                 |          0%                   |
|        |POST /games /{gameId} /players /{playerName} /tax /compute                                              |         0%             |         NO        |           NO                  |               0%              |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Buying property**                                                                                        |                      |                 |                             |                             |
|MUSTHAVE|POST /games /{gameId} /players /{playerName} /properties /{propertyName}                                |         100%             |            YES     |          YES                   |             100%                |
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName}                              |         100%             |       YES          |           YES                  |            100%                 |
|        |With 1 bank auction                                                                                     |        0%              |      NO           |           NO                  |               0%              |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Improving property**                                                                                      |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                        |          100%            |              YES   |         YES                    |               100%              |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /houses                      |            100%          |          YES       |           YES                  |                 100%            |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                         |              100%        |        YES         |            YES                 |     100%                        |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /hotel                       |          100%            |         YES        |             YES                |        100%                    |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Mortgage**                                                                                                |                      |                 |                             |                             |
|        |POST /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage                      |        0%              |        NO         |          NO                   |           0%                  |
|        |DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /mortgage|          0%            |       NO          |       NO                      |               0%              |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Interaction with another player**                                                                         |                      |                 |                             |                             |
|MUSTHAVE|DELETE /games /{gameId} /players /{playerName} /properties /{propertyName} /visitors /{debtorName} /rent|         YES             |       100%         |               100%              |          YES                   |
|        |With potential debt    |            NO         |                 0%|              0%               |           NO
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Prison**                                                                                                  |                      |                 |                             |                             |
|        |POST /games /{gameId} /prison /{playerName} /fine                                                       |        YES              |         100%        |                100%             |           YES                  |
|        |POST /games /{gameId} /prison /{playerName} /free  |         100%             |         YES        |              NO               |          25%                   |
|        |                                                                                                        |                      |                 |                             |                             |
|        |**Auctions**                                                                                                |                      |                 |                             |                             |
|        |GET /games /{gameId} /bank /auctions                                                                    |      0%                |            NO     |      NO                       |            0%                 |
|        |POST /games /{gameId} /bank /auctions /{propertyName} /bid                                              |         0%             |          NO       |        NO                    |              0%               |
