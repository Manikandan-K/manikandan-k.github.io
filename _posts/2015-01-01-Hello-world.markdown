---
layout: post
title:  "How to deploy to Maven"
---

   Have you finished your library and waiting for deploying to Maven. Its as simple as making a coffee!! Follow the instructions below, you can deploy as quick as possible.

### Requirements:

  In order to main consistent behaviour across all the maven libraries, there are some requirements needed for deploying to Central repository.

#### Coordinates:
  `groupId`:    namespace for your library. It should be unique. You need to have domain with this namespace. <br />
                    For example, if your groupId is 'com.test' you should have domain 'test.com'. Alternatively you can also use github account. <br />
                    Lets say, your username is 'user' then your groupId should be 'com.github.user' <br />
  `artifactId`: unique name at your namespace. <br />
  `version`:    Version string for your library. Should not end in '-SNAPSHOT'

#### Support Information:
  `name`: Name of your project. Common practice for name is {groupId}:{artifactId}. <br />
  `description`: Some brief description about your project. <br />
  `url`: Website url or simply your github url where we can find documentation of your library. <br />

#### License:
  You need to specify the license(s) for your library. For example, MIT license,

    <licenses>
        <license>
            <name>MIT License</name>
            <url>http://www.opensource.org/licenses/mit-license.php</url>
        </license>
    </licenses>


#### Developer information.
  Some information about the develper(s) of the library.

    <developers>
        <developer>
            <name>name</name>
            <email>email/email>
            <organization>organisation</organization>
            <organizationUrl>url</organizationUrl>
        </developer>
    </developers>

  You can also github url if you don't have website.

#### SCM information:
  Link to your source control system is also require element.

  Subversion on Google Code:

    <scm>
        <connection>scm:svn:http://foo.googlecode.com/svn/trunk/</connection>
        <developerConnection>scm:svn:https://foo.googlecode.com/svn/trunk/</developerConnection>
        <url>http://foo.googlecode.com/svn/trunk/</url>
    </scm>

  Git hosted by Github:

    <scm>
        <connection>scm:git:git@github.com:juven/git-demo.git</connection>
        <developerConnection>scm:git:git@github.com:juven/git-demo.git</developerConnection>
        <url>git@github.com:juven/git-demo.git</url>
    </scm>

  Git hosted by Google Code:

    <scm>
        <connection>scm:git:https://code.google.com/p/foo/</connection>
        <developerConnection>scm:git:https://code.google.com/p/foo/</developerConnection>
        <url>http://code.google.com/p/foo/source/browse</url>
    </scm>

  Mercurial on BitBucket

    <scm>
        <connection>scm:hg:http://bitbucket.org/juven/hg-demo</connection>
        <developerConnection>scm:hg:https://bitbucket.org/juven/hg-demo</developerConnection>
        <url>http://bitbucket.org/juven/hg-demo</url>
    </scm>

#### Sign Files with GPG/PGP.

  All the files need to be signed with GPG/PGP for deployment.  See [here][pgp-page] for setting up in your local machine.
  There is a maven plugin available for signing the jars. Add this plugin.

    <plugin>
      <groupId>org.apache.maven.plugins</groupId>
      <artifactId>maven-gpg-plugin</artifactId>
      <version>1.5</version>
      <executions>
        <execution>
          <id>sign-artifacts</id>
          <phase>verify</phase>
          <goals>
            <goal>sign</goal>
          </goals>
        </execution>
      </executions>
    </plugin>

  You should configure the settings for the GPG in maven settings.xml

    <settings>
      <profiles>
        <profile>
          <id>ossrh</id>
          <activation>
            <activeByDefault>true</activeByDefault>
          </activation>
          <properties>
            <gpg.executable>gpg</gpg.executable>
            <gpg.passphrase>the_pass_phrase</gpg.passphrase>
          </properties>
        </profile>
      </profiles>
    </settings>


#### Deployment process :

  You need to create new project ticket for deployment to central repository.

  * Create [Jira Account][create-jira] if you dont have one.
  * Create new project [ticket][jira-ticket]

  Usually it'll take 2 to 3 working days for tickets to be resolved.

#### Distribution Management & Authentication:

  You should configure repository details for deployment. When you deploy, your library will be deployed to snapshot repository and then central repository.

    <distributionManagement>
        <snapshotRepository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/content/repositories/snapshots</url>
        </snapshotRepository>
        <repository>
            <id>ossrh</id>
            <url>https://oss.sonatype.org/service/local/staging/deploy/maven2/</url>
        </repository>
    </distributionManagement>

  This configurations need jira user account details. You should give account details in maven(~/.m2/) settings.xml file.

    <settings>
      <servers>
        <server>
          <id>ossrh</id>
          <username>your-jira-id</username>
          <password>your-jira-pwd</password>
        </server>
      </servers>
    </settings>

   id element in server configuration & distribution management configuration should be same.

  And you should also add the nexus staging plugin.

    <plugin>
      <groupId>org.sonatype.plugins</groupId>
      <artifactId>nexus-staging-maven-plugin</artifactId>
      <version>1.6.3</version>
      <extensions>true</extensions>
      <configuration>
         <serverId>ossrh</serverId>
         <nexusUrl>https://oss.sonatype.org/</nexusUrl>
         <autoReleaseAfterClose>true</autoReleaseAfterClose>
      </configuration>
    </plugin>

#### Javadoc and sources jar:

  You should provide javadoc & sources jar when you deploy to central repository. There are already maven plugins available for that.
  Add it to your project.

       <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-source-plugin</artifactId>
          <version>2.4</version>
          <executions>
            <execution>
              <id>attach-sources</id>
              <goals>
                <goal>jar</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-javadoc-plugin</artifactId>
          <version>2.10.1</version>
          <executions>
            <execution>
              <id>attach-javadocs</id>
              <goals>
                <goal>jar</goal>
              </goals>
            </execution>
          </executions>
        </plugin>
      </plugins>

After your token is processed in JIRA, you can deploy to Central repository.

    mvn clean deploy

  This will deploy your library to Staging repository and then Central repository. It'll take some time when you deploy for the first time.
  After 2 to 3 hours, it'll be available in central repository for download.

  If you set `autoReleaseAfterClose` to false in nexus plugin repository, it will be deployed staging repository alone. You can manually check the artifacts in staging repository.
  Now you can deploy from staging repository to Central repository with

    mvn nexus-staging:release

  But if you want to remove your artifact from staging repository for any reasons, you can do that with,

    mvn nexus-staging:drop


[pgp-page]: http://central.sonatype.org/pages/working-with-pgp-signatures.html
[create-jira]: https://issues.sonatype.org/secure/Signup!default.jspa
[jira-ticket]: https://issues.sonatype.org/secure/CreateIssue.jspa?issuetype=21&pid=10134
