package com.chemhack.sbgn.testing;

import com.google.common.base.Function;
import org.apache.commons.lang.StringEscapeUtils;
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
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.concurrent.TimeUnit;

@RunWith(Parameterized.class)
public class RemoteTest {
    static final String SRC_HOST = "http://m62.chemhack.com/";
    protected RemoteWebDriver driver;
    String browser;
    String version;
    Platform platform;
    String url;

    public RemoteTest(String browser, String version, Platform platform, String url) {
        this.browser = browser;
        this.version = version;
        this.platform = platform;
        this.url = url;
    }

    @Parameterized.Parameters
    public static Collection<Object[]> data() {
        Collection<Object[]> data = new ArrayList<Object[]>();
        String url = SRC_HOST + "src/all_tests.html";
        //The list is sorted by our own interest, :D
        data.add(new Object[]{"firefox", "11", Platform.XP, url});
        data.add(new Object[]{"internet explorer", "9", Platform.VISTA, url});
        data.add(new Object[]{"internet explorer", "6", Platform.XP, url});
        data.add(new Object[]{"chrome", "", Platform.XP, url});
        data.add(new Object[]{"opera", "11", Platform.LINUX, url});
        data.add(new Object[]{"internet explorer", "8", Platform.XP, url});
        data.add(new Object[]{"internet explorer", "7", Platform.XP, url});
        data.add(new Object[]{"firefox", "3", Platform.LINUX, url});
        data.add(new Object[]{"firefox", "3", Platform.XP, url});
        data.add(new Object[]{"firefox", "11", Platform.LINUX, url});
        data.add(new Object[]{"chrome", "", Platform.LINUX, url});

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
        System.out.println("Testing:" + this.getEnvInfo());
        this.driver.get(url);
        WebDriverWait wait = new WebDriverWait(this.driver, 60); //wait the test to finish in maximal 60 seconds.
        wait.pollingEvery(5, TimeUnit.SECONDS);
        wait.until(new Function<WebDriver, Boolean>() {
            @Override
            public Boolean apply(@Nullable WebDriver webDriver) {
                return (Boolean) driver.executeScript("return window.testRunner && (window.testRunner.active_==false)");
            }
        });
        Boolean success = (Boolean) driver.executeScript("return window.testRunner.getTestsThatFailed().length==0");
        if (!success) {
            String report = this.getEnvInfo() + "\n" + StringEscapeUtils.unescapeHtml(driver.findElementByCssSelector("div.goog-testrunner-report").getText());
            Assert.fail(report);
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
