package com.chemhack.sbgn.testing;

import com.google.common.base.Function;
import org.apache.commons.lang.StringEscapeUtils;
import org.apache.commons.lang.StringUtils;
import org.junit.After;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.Parameterized;
import org.openqa.selenium.Platform;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.remote.DesiredCapabilities;
import org.openqa.selenium.remote.RemoteWebDriver;
import org.openqa.selenium.support.ui.WebDriverWait;

import javax.annotation.Nullable;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.concurrent.TimeUnit;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@RunWith(Parameterized.class)
public class RemoteTest {
    static final String SRC_HOST = "http://m62.chemhack.com/";
    protected RemoteWebDriver driver;
    String browser;
    String version;
    Platform platform;
    List<String> urlList;

    public RemoteTest(String browser, String version, Platform platform, List<String> urlList) {
        this.browser = browser;
        this.version = version;
        this.platform = platform;
        this.urlList = urlList;
    }

    @Parameterized.Parameters
    public static Collection<Object[]> data() {
        Collection<Object[]> data = new ArrayList<Object[]>();
        List<String> urlList = new ArrayList<String>();
        try {
            BufferedReader reader = new BufferedReader(new InputStreamReader(new URL(SRC_HOST + "src/all_tests.js").openStream()));
            String line;
            Pattern pattern = Pattern.compile("\\./(.*_test\\.html)");
            while ((line = reader.readLine()) != null) {
                Matcher matcher = pattern.matcher(line);
                if (matcher.find()) {
                    final String url = SRC_HOST + "src/" + matcher.group(1);
                    urlList.add(url);
                }
            }
        } catch (IOException e) {
            System.out.println("Unable to get test list file: " + SRC_HOST + "src/all_tests.js exception:" + e.getMessage());
            System.exit(-1);
        }

        //The list is sorted by our own interest, :D
        data.add(new Object[]{"firefox", "11", Platform.XP, urlList});
        data.add(new Object[]{"internet explorer", "9", Platform.VISTA, urlList});
        data.add(new Object[]{"internet explorer", "6", Platform.XP, urlList});
        data.add(new Object[]{"chrome", "", Platform.XP, urlList});
        data.add(new Object[]{"opera", "11", Platform.LINUX, urlList});
        data.add(new Object[]{"internet explorer", "8", Platform.XP, urlList});
        data.add(new Object[]{"internet explorer", "7", Platform.XP, urlList});
        data.add(new Object[]{"firefox", "3", Platform.LINUX, urlList});
        data.add(new Object[]{"firefox", "3", Platform.XP, urlList});
        data.add(new Object[]{"firefox", "11", Platform.LINUX, urlList});
        data.add(new Object[]{"chrome", "", Platform.LINUX, urlList});

        return data;
    }

    @Before
    public void setUp() throws Exception {
        DesiredCapabilities capabillities = new DesiredCapabilities(browser, version, platform);
        this.driver = new RemoteWebDriver(
                new URL("http://blazeblue:3252818f-2100-4854-ad25-10e0e8c88579@ondemand.saucelabs.com:80/wd/hub"),
                capabillities);
    }

    @Test
    public void testRemoteBrowser() throws Exception {
        System.out.println("Testing:" +this.getEnvInfo());
        List<String> reportList = new ArrayList<String>();
        for (String url : urlList) {
            System.out.println("Loading url: "+url);
            this.driver.get(url);
            WebDriverWait wait = new WebDriverWait(this.driver, 15); //wait the test to finish in maximal 15 seconds.
            wait.pollingEvery(5, TimeUnit.SECONDS);
            wait.until(new Function<WebDriver, Boolean>() {
                @Override
                public Boolean apply(@Nullable WebDriver webDriver) {
                    return (Boolean) driver.executeScript("return window.G_testRunner && window.G_testRunner.isFinished()");
                }
            });
            Boolean success = (Boolean) driver.executeScript("return window.G_testRunner.isSuccess()");
            if (!success) {
                String report = (String) driver.executeScript("return window.G_testRunner.getReport()");
                reportList.add(this.getEnvInfo() + "\n" + StringEscapeUtils.unescapeHtml(report));
            }
        }
        if (reportList.size() > 0) {
            Assert.fail(StringUtils.join(reportList, "\n----------------------------------------\n"));
        }
    }

    @After
    public void tearDown() throws Exception {
        this.driver.quit();
    }

    public String getEnvInfo() {
        return "RemoteTest{" +
                "browser='" + browser + '\'' +
                ", version='" + version + '\'' +
                ", platform=" + platform +
                '}';
    }
}
