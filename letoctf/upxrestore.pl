#!/usr/bin/perl

## upxrestore.pl
##
## Fixes UPX headers removed by hacked UPX version
## commonly used to pack various malware
## Use on win32 may require binmode
## (c)2004 Joe Stewart <joe@joestewart.org>

use strict;

my $file = $ARGV[0];
die "Usage: $0 <modified UPX-packed exe>\n" unless $file;

my $buf;
my $version = "1.24"; # 4-byte UPX version to insert

open(IN, $file) or die "Could not open $file : $!\n";
read(IN, $buf, 2);
die "DOS header not found!\n" unless $buf eq "MZ";
seek(IN, 60, 0);
read(IN, $buf, 4);
my $peoffset = unpack("I",$buf);
seek(IN, $peoffset, 0);
read(IN, $buf, 2);
die "PE header not found!\n" unless $buf eq "PE";
printf "PE header found at offset 0x%x\n", $peoffset;
seek(IN, $peoffset+20, 0);
read(IN, $buf, 2);
my $optheadersize = unpack("S", $buf);
printf "Skipping optional header (size = 0x%x)\n", $optheadersize;
seek(IN, $peoffset+24+$optheadersize, 0);
my $upx0 = $peoffset+24+$optheadersize;
my $upx1 = $upx0 + 40;
my $upx2 = $upx1 + 40;
my $ver = 0x3db;
my $nam = 0x3e0;

open(OUT, ">$file\.upx") or die "Can't create file $file\.upx : $!\n";
seek(IN,0,0);
my $ptr = 0;
while(!eof(IN)) {
        if ($ptr == $upx0) {
                printf "Restoring UPX0 header name at 0x%x\n", $upx0;
                print OUT "UPX0\x0";
                $ptr += 5;
        } elsif ($ptr == $upx1) {
                printf "Restoring UPX1 header name at 0x%x\n", $upx1;
                print OUT "UPX1\x0";
                $ptr += 5;
        } elsif ($ptr == $upx2) {
                printf "Restoring UPX2 header name at 0x%x\n", $upx2;
                print OUT "UPX2\x0";
                $ptr += 5;
        } elsif ($ptr == $ver) {
                printf "Restoring UPX version at 0x%x\n", $ver;
                print OUT substr($version,0,4), "\x0";
                $ptr += 5;
        } elsif ($ptr == $nam) {
                printf "Restoring UPX program name at 0x%x\n", $nam;
                print OUT "UPX!";
                $ptr += 4;
        } else {
                read(IN, $buf, 1);
                print OUT $buf;
                $ptr++;
        }
        seek(IN, $ptr, 0);
}
close OUT;
close IN;
print "Saved restored file as $file\.upx\n"

