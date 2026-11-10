# pwnstamp verifier

The web verifier of pwnstamp proofs, served at https://verify.pwnstamp.org. Proofs are checked in the browser
by pwnstamp-core compiled to WebAssembly, against the pinned beta root; nothing is sent anywhere.

Beta root `pwnstamp root beta`, SHA-256 of the certificate (DER):

    7f42e3d2306087abc35ffcaa7cc5e63c7e6dd0c378bbfd41070f38d015234b39

Also published in DNS: `dig +short TXT _root.pwnstamp.org` returns `v=pwnstamp-beta; fp=7f42e3d2306087abc35ffcaa7cc5e63c7e6dd0c378bbfd41070f38d015234b39`.

Built by `scripts/build-verifier.sh` of the pwnstamp repository; this repository holds only the
output, until the verifier moves to the main repository.
