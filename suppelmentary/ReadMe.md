## Using Provengo for Bootstrapping Model-Based Testing (Experience Paper) - Supplementary material 
### General
The directory holds additional resources related to the paper titled "Experience Paper: Using Provengo for Bootstrapping Model-Based Testing." 

The software artifacts included in this folder enable researchers, software developers, and test engineers to replicate the procedure outlined in the publication.

### Installation
The following steps are required to install the software artifacts:
1. Install the [Provengo] as described in [Provengo Documentation](https://docs.provengo.tech/main/site/ProvengoCli/0.9.5/installation.html).
2. Follow the example given in Provengo documentation as a [Provengo Simple Example](https://docs.provengo.tech/main/site/ProvengoCli/0.9.5/tutorial/simple/index.html) in order to achieve initial skill in using the tools.
3. Following the instruction in the [Provengo Online Store Example](https://docs.provengo.tech/main/site/ProvengoCli/0.9.5/tutorial/magento/intro.html) for installation the 'Megento-2' online store.  

### Usage

Each directory containd the following files:
1. Events.story.js - the story file that contains the stories that will be used for the test generation.
2. EventDef.js - the file that contains the definition of the events that will be used for the test generation.
3. [optional] dal.story.js - the file that contains the data access layer (DAL) that will be used for the test generation.


Run the following command in the command line:

>provengo run --before-test "python ./empty_cart.py" [name of the directory containing Events.story.js, EventDef.js and dal.story.js]  

where ' --before-test "python ./empty_cart.py" ' is the command that will be executed before the test generation. In this example, the command will empty the cart and reset the Magento-2 database before the test generation.

the command will generate the test cases in the following directory:

### Supplementary Material
The following provides the directories and files included in the supplementary material.
1. firstExample - the directory contains the files that are used for the first example in the article (listing 3).
2. secondExample - the directory contains the files that are used for the second example in the article (listing 4 & 5).
3. thirdExample - the directory contains the files that are used for the third example in the article (listing 6 & 9).
4. fullExample - the directory contains the files that are used for the full test case generation, including the additional tests as admin (as described in paragraph VI E).

`