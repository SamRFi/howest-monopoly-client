# Monopoly web project group [number]

## Before you start
Search for the string XX and **replace it with your group number**.

## Parent group
https://git.ti.howest.be/TI/2021-2022/s2/programming-project/projects/group-26

## Remote urls
### Your own project
* https://project-i.ti.howest.be/monopoly-26/
* https://project-i.ti.howest.be/monopoly-26/api/

### Provided API
* https://project-i.ti.howest.be/monopoly-api-spec/


## Please complete the following before committing the final version on the project
Please **add** any **instructions** required to
* Make your application work if applicable
* Be able to test the application (login data)
* View the wireframes

Also clarify
* If there are known **bugs**
* If you haven't managed to finish certain required functionality

## Instructions for local CI testing
You can **run** the validator and Sonar with CSS and JS rules **locally.** There is no need to push to the server to check if you are compliant with our rules. In the interest of sparing the server, please result to local testing as often as possible.

If everyone will push to test, the remote will not last.

Please consult the Sonar guide at [https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/sonar-guide/Sonar%20guide.md](https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/sonar-guide/Sonar%20guide.md)

## Client
In order to help you along with planning, we've provided a client roadmap
[https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/roadmaps/client-roadmap.md](https://git.ti.howest.be/TI/2021-2022/s2/programming-project/documentation/monopoly-documentation/-/blob/main/roadmaps/client-roadmap.md)

## File structure
All files should be places in the `src` directory.

**Do not** change the file structure of the folders outside of that directory. Within, you may do as you please.


## Default files

### CSS
The `reset.css` has aleady been supplied, but it's up to you and your team to add the rest of the styles. Please feel free to split those up in multiple files. We'll handle efficient delivery for products in production in later semesters.

### JavaScript
A demonstration for connecting with the API has already been set up. We urge you to separate your JS files as **atomically as possible**. Add folders as you please.

## Extra tips for CSS Grid
In case you get stuck or confused
https://learncssgrid.com/

And for your convenience, yet use with caution
https://grid.layoutit.com/ 

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
